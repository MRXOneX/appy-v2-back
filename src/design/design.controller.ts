import { Body, Get, Controller, Post, Query, Param } from '@nestjs/common';
import { DesignService } from './design.service';

@Controller('design')
export class DesignController {
  constructor(private designService: DesignService) {}

  @Post('create')
  async create(@Body() design: any): Promise<any> {
    return this.designService.createDesign(design);
  }

  @Post('save')
  async save(@Body() data: any): Promise<any> {
    return await this.designService.save(data);
  }

  @Get(':id')
  async getOne(@Param() param: any): Promise<any> {
    return this.designService.getOne(+param?.id);
  }

  @Post('preview')
  async Preview(@Body() body: any): Promise<any> {
    return this.designService.preview(body);
  }
}
