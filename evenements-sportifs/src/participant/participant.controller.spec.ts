// import { Test, TestingModule } from '@nestjs/testing';
// import { ParticipantController } from './participant.controller';
// import { ParticipantService } from './participant.service';
// import { CreateParticipantDto } from './dto/create-participant.dto';
// import { UpdateParticipantDto } from './dto/update-participant.dto';
// import { BadRequestException, NotFoundException } from '@nestjs/common';
// import { Participant } from './entities/participant.entity';
// import { JwtService } from '@nestjs/jwt';


// describe('ParticipantController', () => {
//   let controller: ParticipantController;
//   let service: ParticipantService;

//   const mockParticipant: Participant = {
//     _id: '1',
//     name: 'alae',
//     email: 'alae@gmail.com',
//     phone: '123-456-7890',
//   } as Participant;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [ParticipantController],
//       providers: [
//         JwtService,
//         {
//           provide: ParticipantService,
//           useValue: {
//             createParticipant: jest.fn(),
//             findAllParticipant: jest.fn(),
//             findOneParticipant: jest.fn(),
//             updateParticipant: jest.fn(),
//             removeParticipant: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<ParticipantController>(ParticipantController);
//     service = module.get<ParticipantService>(ParticipantService);
//   });

//   describe('findAllParticipant', () => {
//     it('should return an array of participants', async () => {
//       const mockParticipants = [mockParticipant];
//       jest.spyOn(service, 'findAllParticipant').mockResolvedValue(mockParticipants);

//       const result = await controller.findAllParticipant();

//       expect(result).toEqual(mockParticipants);
//       expect(service.findAllParticipant).toHaveBeenCalled();
//     });

//     it('should handle errors in findAllParticipant', async () => {
//       jest.spyOn(service, 'findAllParticipant').mockRejectedValue(new BadRequestException());

//       await expect(controller.findAllParticipant()).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('findOneParticipant', () => {
//     it('should return a single participant', async () => {
//       jest.spyOn(service, 'findOneParticipant').mockResolvedValue(mockParticipant);

//       expect(await controller.findOneParticipant('1')).toBe(mockParticipant);
//     });
//   });

//   describe('createParticipant', () => {
//     it('should create a participant successfully', async () => {
//       const createParticipantDto: CreateParticipantDto = {
//         name: 'alae',
//         email: 'alae@gmail',
//         phone: '157523456',
//         genre: 'admin'
//       };

//       jest.spyOn(service, 'createParticipant').mockResolvedValue(mockParticipant);

//       expect(await controller.createParticipant(createParticipantDto)).toBe(mockParticipant);
//     });

//     it('should throw BadRequestException when service fails', async () => {
//       const createParticipantDto: CreateParticipantDto = {
//         name: 'alae',
//         email: 'alae@gmail',
//         phone: '157523456',
//         genre: 'admin'
//       };

//       jest.spyOn(service, 'createParticipant').mockRejectedValue(new BadRequestException());

//       await expect(controller.createParticipant(createParticipantDto)).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('updateParticipant', () => {
//     it('should update a participant', async () => {
//       const updateParticipantDto: UpdateParticipantDto = {
//         name: 'Updated Participant',
//       };

//       jest.spyOn(service, 'updateParticipant').mockResolvedValue(mockParticipant);

//       expect(await controller.updateParticipant('1', updateParticipantDto)).toBe(mockParticipant);
//     });

//     it('should throw BadRequestException when service fails', async () => {
//       const updateParticipantDto: UpdateParticipantDto = {
//         name: 'Updated Participant',
//       };

//       jest.spyOn(service, 'updateParticipant').mockRejectedValue(new BadRequestException());

//       await expect(controller.updateParticipant('1', updateParticipantDto)).rejects.toThrow(BadRequestException);
//     });
//   });

//   describe('removeParticipant', () => {
//     it('should remove a participant', async () => {
//       jest.spyOn(service, 'removeParticipant').mockResolvedValue({
//         participant: mockParticipant,
//         message: 'Participant removed successfully',
//       });

//       expect(await controller.removeParticipant('1')).toEqual({
//         participant: mockParticipant,
//         message: 'Participant removed successfully',
//       });
//     });

//     it('should throw BadRequestException when service fails', async () => {
//       jest.spyOn(service, 'removeParticipant').mockRejectedValue(new BadRequestException());

//       await expect(controller.removeParticipant('1')).rejects.toThrow(BadRequestException);
//     });
//   });
// });
