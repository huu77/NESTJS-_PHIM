import { CreateVideoDto } from './dto/CreateVideo.dto';
import { HttpException, HttpStatus, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as ffmpeg from 'fluent-ffmpeg';
import { Phim } from './entity/phims.entity';
import * as path from 'path';
import { TheLoai } from 'src/theloais/entity/theloai.entity';
import { QuocGia } from 'src/quocgia/entity/quocgia.entity';
import * as fs from 'fs';
import { FilterDto } from './dto/Filter.dto';
// ffmpeg.setFfmpegPath(path.join(__dirname, '../ffmpeg/bin/ffmpeg.exe'));
// ffmpeg.setFfprobePath(path.join(__dirname, '../ffmpeg/bin/ffprobe.exe'));
@Injectable()
export class PhimsService {
  constructor(@InjectRepository(Phim) private readonly phimRepo: Repository<Phim>,
    @InjectRepository(TheLoai)
    private readonly theloaiRepo: Repository<TheLoai>,
    @InjectRepository(QuocGia)
    private readonly quocgiaRepo: Repository<QuocGia>,
  ) { }

  //create body
  async cretaeBody(info: CreateVideoDto): Promise<any> {
    try {
      const theloai = await this.theloaiRepo.findOne({ where: { id_theloai: info?.id_theloai } });
      const quocgia = await this.quocgiaRepo.findOne({ where: { id_quocgia: info?.quocGiaId } });
      if (!theloai || !quocgia) {
        throw new HttpException('Invalid theloai or quocgia ID', HttpStatus.BAD_REQUEST);
      }
      const newPhim = this.phimRepo.create({
        namePhim: info?.namePhim.toUpperCase(),
        mota: info?.mota,
        ngay_phat_hanh: info?.ngay_phat_hanh, // Gán đối tượng Date đã chuyển đổi
        diem_danh_gia: info?.diem_danh_gia,
        tapphim: info?.tapphim,
        src: info?.src,
        theloai: theloai,
        quocgia: quocgia,
      });

      await this.phimRepo.save(newPhim);

      return {
        message: 'Phims information get all successfully',
        user: newPhim,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException('phims is not create', HttpStatus.BAD_REQUEST);
    }

  }
  //create img
  async createImg(file: any, id: string) {
    const filePath = file.path
    const phim = await this.phimRepo.findOne({ where: { id } })
    if (!phim) {
      throw new HttpException('phims is not create', HttpStatus.BAD_REQUEST);
    }
    const safeFilePath = filePath.split('\\')[1];
    try {

      phim.img_nen = safeFilePath


      await this.phimRepo.save(phim);
    } catch (error) {
      try {
        fs.unlinkSync(filePath); // Xóa hình ảnh từ thư mục
      } catch (err) {
        console.error('Error while deleting image:', err);
      }
      throw new HttpException('Img is not updated', HttpStatus.BAD_REQUEST);
    }

  }


  //create video
  async fileUpload(@Req() req, @Res() res, file: any, id: string) {
    const supportedFiles = ['mp4', 'avi', 'mkv']; // Add the list of supported file extensions
    try {
      const phim = await this.phimRepo.findOne({ where: { id } });
      if (!phim) {
        return res.status(400).json('No phim is created.');
      }
      if (!file) {
        return res.status(400).json('No file provided.');
      }

      const fileExtension = this.getFileExtension(file);
      if (!supportedFiles.includes(fileExtension)) {
        return res.status(400).json('Invalid file format.');
      }

      phim.src = file.path.split('\\')[1];

      // Save the Phim entity to the database
      await this.phimRepo.save(phim);

      return res.status(201).json('Success! Video uploaded and saved to the database.');
    } catch (err) {


      // If there's an error, delete the video from the folder
      try {
        fs.unlinkSync(file.path);
      } catch (unlinkErr) {
        console.error('Error while deleting video:', unlinkErr);
      }

      return res.status(500).json('Failed to process the video or save to the database.');
    }
  }
  //

  getFileExtension(file: any): string {
    const fileName = file.originalname;
    return fileName.split('.').pop();
  }

  getFileNameWithoutExtension(originalname: any): string {
    return originalname.split('.').slice(0, -1).join('.');
  }



  //get all
  async getAll(query: FilterDto): Promise<any> {
    const item_per_page = Number(query.item_per_page) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || ''
    const skip = (page - 1) * item_per_page
    const filter=query.filter
    const [phims, total] = await this.phimRepo.findAndCount({
      where: [
        { namePhim: Like('%' + search.toUpperCase() + '%') }
      ],
      order: { createdAt: filter },
      skip: skip,
    })

    if (!phims) {
      throw new HttpException('phims not found', HttpStatus.BAD_REQUEST);
    }
    const lastPage = Math.ceil(total / item_per_page)
    const nextPage = page + 1 > lastPage ? null : page + 1
    const prePage = page - 1 < 1 ? null : page - 1
    return {
      message: 'Phims information get all successfully',
      user: phims,
      lastPage:lastPage,
      nextPage:nextPage,
      prePage:prePage,
      status: HttpStatus.OK,
    };
  }
  //delete phim
  async deletePhim(id: string): Promise<any> {
    const phim = await this.phimRepo.findOne({ where: { id } });
    if (!phim) {
      throw new HttpException('Phim not found', HttpStatus.NOT_FOUND);
    }

    const pathImg = `uploads\\${phim.img_nen}`;
    const pathSrc = `uploads\\${phim.src}`;

    try {
      if (phim.img_nen) {
        // Xóa tệp img_nen từ thư mục
        await fs.promises.unlink(pathImg);
      }

      if (phim.src) {
        // Xóa tệp src từ thư mục
        await fs.promises.unlink(pathSrc);
      }

      // Xóa phim từ cơ sở dữ liệu
      await this.phimRepo.delete(id);

      return {
        message: 'Phims is delete successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error while deleting phim:', error);
      throw new HttpException('Failed to delete phim', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  // getPhimtoTheLoai
  async getPhimtoTheLoai(id: string): Promise<any> {
    const ID = id.toString()

    const listPhim = await this.phimRepo.find({
      // relations: ['theloai'],
      where: { theloai: { id_theloai: ID } },
    });

    return {
      message: 'Phims is get from to the loai successfully',
      list: listPhim,
      status: HttpStatus.OK,
    };

  }
  //get from to quoc gia
  async getPhimtoQuocgia(id: string): Promise<any> {
    const ID = id.toString()

    const listPhim = await this.phimRepo.find({
      relations: ['quocgia'],
      where: { quocgia: { id_quocgia: ID } },
    });

    return {
      message: 'Phims is get from to quoc gia successfully',
      list: listPhim,
      status: HttpStatus.OK,
    };

  }
  //
}
