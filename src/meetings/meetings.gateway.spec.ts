import { Test, TestingModule } from '@nestjs/testing';
import { MeetingsGateway } from './meetings.gateway';
import { MeetingsService } from './meetings.service';

describe('MeetingsGateway', () => {
  let gateway: MeetingsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetingsGateway, MeetingsService],
    }).compile();

    gateway = module.get<MeetingsGateway>(MeetingsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
