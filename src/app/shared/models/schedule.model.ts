export class ScheduleModel {
  scheduleId: number;
  scheduleDate: Date;
  scheduleTime: string;
  scheduleContent: string;
  locationId?: number;
  id: number;
  otherLocation: string;
  createdDate: Date;
  isActive: boolean;
  officerName: string;
  userIds: number[];
  otherHost: string;
  groupMeetingIds: number[];
  iSendSMS: boolean;
  isSendEmail: boolean;
  participantDisplay: string;
  isOtherParticipant: boolean;
  otherParticipants: IOtherParticipantSelected[];
  participantIsSelected?: IParticipantIsSelected[];
  scheduleStatus: EScheduleStatus;
  reasonChangeSchedule: string;
  scheduleTitle: string;
  scheduleTitleTemplateId: number;
  isSendSMSInvite?: boolean;
  messageContent: string;
  departmentPrepare: string;
  scheduleLocation: string;
  isHasFilesAttachment?: boolean;

  constructor() {
    this.scheduleDate = null;
    this.scheduleTime = null;
    this.scheduleContent = null;
    this.id = 0;
    this.isActive = true;
    this.createdDate = new Date();
  }
}

export interface IParticipantIsSelected {
  departmentName: string;
  participantId: number;
  receiverName: string;
}

export interface IOtherParticipantSelected {
  otherParticipantId?: number;
  name: string;
  email: number;
  phoneNumber: string;
}

export enum EScheduleStatus {
  Pending,
  Approve,
  Pause, // Hoãn lịch
  Changed, // Dời lịch
  Release, // Phát hành
}

export class ScheduleByWeekModel {
  dayOfWeek: string;
  morning: ScheduleModel[];
  afternoon: ScheduleModel[];
  evening: ScheduleModel[];

  constructor() {
    this.morning = [];
    this.evening = [];
    this.afternoon = [];
  }
}

export class AuditScheduleModel {
  id: number;
  changeFrom: string;
  changeTo: string;
  changeDate: Date;
  scheduleId: number;

  constructor() {
    this.id = 0;
    this.changeFrom = '';
    this.changeTo = '';
    this.changeDate = new Date();
    this.scheduleId = 0;
  }
}


export class ScheduleFilesAttachment {
  id?: number;
  scheduleId: number;
  fileName: string;
  filePath: string;
  cloudinaryPublicId: string;
  notationNumber: string;
  releaseDate: Date;
  quote: string;
  constructor() {
    this.id = 0;
    this.filePath = '';
    this.scheduleId = 0;
    this.fileName = '';
    this.cloudinaryPublicId = '';
    this.notationNumber = '';
    this.releaseDate = new Date();
    this.quote = '';
  }
}
