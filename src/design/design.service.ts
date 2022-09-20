import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DesignService {
  constructor(private prisma: PrismaService) {}

  async getDesign() {
    return await this.prisma.design.findMany();
  }

  async createDesign(design: any): Promise<any> {
    return await this.prisma.design.create({
      data: {
        title: design?.title,
      },
    });
  }

  async save(data: any): Promise<any> {
    return await this.prisma.design.update({
      where: {
        id: data.designId,
      },
      data: {
        elements: data.elements,
      },
    });
  }

  async getOne(id: number): Promise<any> {
    if (id) {
      return await this.prisma.design.findUnique({
        where: {
          id: id,
        },
      });
    }
  }

  async updateCanvasWidth(id: number, canvasWidth: number): Promise<any> {
    return await this.prisma.design.update({
      where: {
        id,
      },
      data: {
        canvasWidth,
      },
    });
  }

  async updateCanvasHeight(id: number, canvasHeight: number): Promise<any> {
    return await this.prisma.design.update({
      where: {
        id,
      },
      data: {
        canvasHeight,
      },
    });
  }

  // async addElement(data: any) {
  //   return await this.prisma.element.create({
  //     data: {
  //       ...data.element,
  //       design: { connect: { id: data.designId } },
  //     },
  //   });
  // }
}
