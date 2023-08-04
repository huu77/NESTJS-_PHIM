import { Controller, Post, Req, Res, UploadedFile, UseInterceptors, Get, UseGuards, Body, UploadedFiles, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PhimsService } from './phims.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname, join } from 'path';
import { AuthGuard } from 'src/users/auth.guard';
import { Phim } from './entity/phims.entity';
import { CreateVideoDto } from './dto/CreateVideo.dto';
import { multerOptions } from 'src/config/multerConfig';
import * as express from 'express';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { FilterDto } from './dto/Filter.dto';
import * as fs from 'fs';
import { of } from 'rxjs';
@UsePipes(new ValidationPipe())
@Controller('phims')
export class PhimsController {
    constructor(private readonly phimService: PhimsService) { }


    // step 1 create info phim 
    //step 2 update img phim
    //step 3 update video phim
    //step 4 if uncreate ---> delete phim and path
    //step 5 create new phim
    // note : dont create new phim only firt time

    @Post('info')
    @UseGuards(AdminAuthGuard)
    async createBody(@Body('info') info: CreateVideoDto) {
        

        return this.phimService.cretaeBody(info)
    }

    @Post('uploadImg/:id')
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(FileInterceptor('imageFile', multerOptions))
    async createImg(@UploadedFile() imageFile: Express.Multer.File, @Param('id') id: string) {
        return this.phimService.createImg(imageFile, id)
    }
    //video
    @Post('uploadSrc/:id')
    @UseGuards(AdminAuthGuard)
    @UseInterceptors(
        FileInterceptor('videoFile', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),


    )
    async create(@UploadedFile() file: Express.Multer.File, @Req() request: Request, @Res() response, @Param('id') id: string) {

        console.log(file);

        try {

            await this.phimService.fileUpload(request, response, file, id);

        } catch (error) {
            return response.status(500)
                .json(`Failed to upload video file: ${error.message}`);
        }
    }

    //
    @Delete("delete/:id")
    @UseGuards(AdminAuthGuard)
    async deletePhim(@Param('id') id: string) {
        return await this.phimService.deletePhim(id)
    }
    //GET ALL
    @Get()
    @UseGuards(AuthGuard)
    async getAll(@Query() query:FilterDto): Promise<any> {
        return this.phimService.getAll(query)
    }
    //GET ONE VIDEO
    @Get(':filename')
    // @UseGuards(AuthGuard)
    serveVideo(@Param('filename') filename: string,@Res() res) {
        const videoPath = join(process.cwd(), 'uploads/'+ filename)
         
       if (fs.existsSync(videoPath)) {
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = res.req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });

        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4', // Đảm bảo đúng định dạng video
        });

        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        });
        fs.createReadStream(videoPath).pipe(res);
      }
    } else {
      res.status(404).send('Video not found');
    }
    }

    // get phim from to the loai
    @Get('theloai/:id_theLoai')
    @UseGuards(AuthGuard)
    async getPhimtoTheLoai(@Param('id_theLoai') id: string): Promise<any> {
        console.log(id);
        
        return this.phimService.getPhimtoTheLoai(id)
    }
    // get phim from to quoc gia
    @Get('quocgia/:id_quocgia')
    @UseGuards(AuthGuard)
    async getPhimtoQuocgia(@Param('id_quocgia') id: string): Promise<any> {
        console.log(id);
        
        return this.phimService.getPhimtoQuocgia(id)
    }

    // get phim from to ngay phat hanh

    //    get from to name , filter, and pagination


}
