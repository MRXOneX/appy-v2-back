import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//
import { createCanvas, loadImage } from 'canvas';
// const { createCanvas } = from('canvas');

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

  async preview(body: any): Promise<any> {
    console.log(body);
    // if (body.id) {
    const design = await this.prisma.design.findUnique({
      where: {
        id: body.designId,
      },
    });

    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');

    // Write "Awesome!"
    ctx.font = '30px Impact';
    ctx.rotate(0.1);
    ctx.fillText('Awesome!', 50, 100);

    // Draw line under text
    const text = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + text.width, 102);
    ctx.stroke();

    // Draw cat with lime helmet
    loadImage('src/utils/images/shapes.png').then((image) => {
      ctx.drawImage(image, 50, 0, 70, 70);
    });
    return design;
    // }
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
