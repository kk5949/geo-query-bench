import {Controller, Get, Post, Body, Patch, Param, Delete, Injectable} from '@nestjs/common';
import { StoresService } from './stores.service';
import {StoreSearchDto} from "./dto/store-search.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Store} from "./entities/store.entity";

@Controller('stores')
export class StoresController {
  constructor(
      private readonly storesService: StoresService
  ) {}

  @Get()
  async search(
      @Body() storeSearchDto: StoreSearchDto
  ){
    const stores = await this.storesService.searchStoreNearby(storeSearchDto)
    return {
      success: true,
      count: stores.length,
      data: stores.map(store => ({
        ...store,
        distance: parseFloat(store.distance).toFixed(2) + ' km'
      }))
    };
  }
}
