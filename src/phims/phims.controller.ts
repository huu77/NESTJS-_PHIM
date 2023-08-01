import { Controller, Post, Req, Res, UploadedFile, UseInterceptors, Get, UseGuards, Body, UploadedFiles, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PhimsService } from './phims.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { AuthGuard } from 'src/users/auth.guard';
import { Phim } from './entity/phims.entity';
import { CreateVideoDto } from './dto/CreateVideo.dto';
import { multerOptions } from 'src/config/multerConfig';
import * as express from 'express';
import { AdminAuthGuard } from 'src/users/adminAuth.guard';
import { FilterDto } from './dto/Filter.dto';

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
    @Get('video/:id')
    @UseGuards(AuthGuard)
    serveVideo(@Res() res: Response, @Param('id') id: string) {
        const videoPath = path.join(__dirname, `../video/${id}`);
        return express.static(videoPath);
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
