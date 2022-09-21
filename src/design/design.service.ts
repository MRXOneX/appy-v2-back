import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
//
import { createCanvas, registerFont, Image, loadImage } from 'canvas';
import sharp from 'sharp';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Konva = require('konva/cmj').default;
import * as fs from 'fs';
registerFont('src/fonts/nunito.ttf', { family: 'Nunito' });
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
    const design = await this.prisma.design.findUnique({
      where: {
        id: body.designId,
      },
    });

    const stage = new Konva.Stage({
      width: design.canvasWidth,
      height: design.canvasHeight,
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    const drawElements = async () => {
      JSON.parse(design.elements).forEach(async (el: any) => {
        if (el.type === 'rect') {
          const box = new Konva.Rect({
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            fill: el.fill,
          });
          layer.add(box);
          return;
        }
        if (el.type === 'text') {
          const text = new Konva.Text({
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            fill: el.fill,
            fontStyle: el.fontStyle,
            fontFamily: el.fontFamily,
            fontSize: el.fontSize,

            text: el.isReplace ? body.texts[el.id]?.text : el.text,
          });
          layer.add(text);
          return;
        }
        if (el.type === 'image') {
          // const img = await loadImage(el.image);
          // console.log(img);

          // const yoda = new Konva.Image({
          //   image: img,
          //   x: el.x,
          //   y: el.y,
          //   width: el.width,
          //   height: el.height,
          // });

          // layer.add(yoda);

          loadImage('src/utils/images/shapes.png').then((img: any) => {
            console.log(img)
            const image = new Konva.Image({
              image: img,
              x: el.x,
              y: el.y,
              width: el.width,
              height: el.height,
            });
            layer.add(image);
          });

          // const img = new Image();
          // img.src = el.image;
          // const image = new Konva.Image({
          //   image: img,
          //   x: el.x,
          //   y: el.y,
          //   width: el.width,
          //   height: el.height,
          // });
          // layer.add(image);
          return;
        }
      });
    };

    console.log('log');
    await drawElements();
    console.log('tolog');
    const dataURL = stage.toDataURL({ pixelRatio: 3 });

    console.log(dataURL);
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
