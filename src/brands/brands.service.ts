import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Brand } from './entities/brand.entity';

import { CreateBrandDto, UpdateBrandDto } from './dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
    // {
    //   id: uuid(),
    //   name: 'Jeep',
    //   createdAt: new Date().getTime(),
    // },
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
    // return 'This action adds a new brand';
  }

  findAll() {
    return this.brands;
    // return `This action returns all brands`;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found.`);
    return brand;
    // return `This action returns a #${id} brand`;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);
    this.brands = this.brands.map((brand) => {
      if (brand.id === brandDB.id) {
        brandDB = {
          ...brandDB,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
          id,
        };
        return brandDB;
      }
      return brand;
    });

    // return `This action updates a #${id} brand`;
  }

  remove(id: string) {
    const brandDB = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== brandDB.id);
    return;
    // return `This action removes a #${id} brand`;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
