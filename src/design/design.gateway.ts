import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DesignService } from './design.service';
import { Socket, Server } from 'socket.io';

type CanvasSizePayload = {
  id: number;
  size: number;
};

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DesignGateway {
  constructor(private designService: DesignService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('changeCanvasWidthServer')
  async changeCanvasWidth(client: Socket, payload: CanvasSizePayload) {
    const updateCanvasWidth = await this.designService.updateCanvasWidth(
      payload.id,
      payload.size,
    );

    if (updateCanvasWidth) {
      this.server.emit('changeCanvasWidthClient', {
        id: updateCanvasWidth.id,
        canvasWidth: updateCanvasWidth.canvasWidth,
      });
    }
  }
  @SubscribeMessage('changeCanvasHeightServer')
  async changeCanvasHeight(client: Socket, payload: CanvasSizePayload) {
    const updateCanvasHeight = await this.designService.updateCanvasHeight(
      payload.id,
      payload.size,
    );

    if (updateCanvasHeight) {
      this.server.emit('changeCanvasHeightClient', {
        id: updateCanvasHeight.id,
        canvasHeight: updateCanvasHeight.canvasHeight,
      });
    }
  }

  // @SubscribeMessage('addElementServer')
  // async addElement(client: Socket, payload: any) {
  //   const element = await this.designService.addElement(payload);
  //   if (element) {
  //     console.log(element);
  //     this.server.emit('addElementClient', element);
  //   }
  // }
}
