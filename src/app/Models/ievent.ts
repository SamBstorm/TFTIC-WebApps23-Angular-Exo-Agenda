import { IParticipant } from './iparticipant';
export interface IEvent {
  name : string;
  start_date : Date;
  end_date : Date;
  is_all_day : boolean;
  start_time? : Date;
  end_time? : Date;
  place? : string;
  participants? : IParticipant[];
}
