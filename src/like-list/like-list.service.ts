import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { LikeList } from './entity/likeList.entity';
import { LikeListDto } from './dto/likeList.dto';
import { Users } from 'src/users/entity/users.entity';
import { Phim } from 'src/phims/entity/phims.entity';

@Injectable()
export class LikeListService {
    constructor(@InjectRepository(LikeList) private readonly likeListRepo: Repository<LikeList>,
        @InjectRepository(Users)
        private readonly userRepo: Repository<Users>, @InjectRepository(Phim) private readonly phimRepo: Repository<Phim>) { }


    //from id user , get all list phim you like 
    async getAllListLike(id: string): Promise<any> {
        // const list = await this.likeListRepo.find({ where: { user_like_id: id } })
        const list = await this.likeListRepo.find({ relations: { users: true }, where: { users: { id } } })

        //get list have id of likelistRepo
        if (!list) {
            throw new HttpException('Not list', HttpStatus.BAD_REQUEST);
        }
        const map = list.map((x) => x.id)
        //get list with phim from to array id of map 
        const listPhim = await this.likeListRepo.find({ relations: { phims: true }, where: { id: In(map) } })
        const lp= listPhim.map(x=>x.phims)
        console.log(lp);
        return {
            message: 'list information get all successfully',
            data: lp,
            status: HttpStatus.OK,
        };
    }

    async createAndUpdate(info: LikeListDto): Promise<any> {


        try {
            const { phim_like_id, user_like_id, unlike } = info
            const checkExits = await this.likeListRepo.findOne({
                where: { phims: { id: phim_like_id }, users: { id: user_like_id } }
            });

            if (!checkExits) {
                const user = await this.userRepo.findOne({ where: { id: user_like_id } })
                const phim = await this.phimRepo.findOne({ where: { id: phim_like_id } })
                if (!user || !phim) {
                    throw new HttpException('Invalid dienvien or phim ID', HttpStatus.BAD_REQUEST);
                }
                const list = new LikeList()
                list.phims = phim
                list.users = user
                list.unlike = unlike
                await this.likeListRepo.save(list)

                return {
                    message: 'list information create successfully',
                    user: list,
                    status: HttpStatus.OK,
                };
            }
            else {
                checkExits.unlike = unlike;
                await this.likeListRepo.save(checkExits);

                return {
                    message: 'Like list information updated successfully',
                    user: checkExits,
                    status: HttpStatus.OK,
                };
            }

        } catch (error) {
            throw new HttpException('Not list like', HttpStatus.BAD_REQUEST);
        }
    }


    //
}
