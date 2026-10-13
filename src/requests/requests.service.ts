import { Injectable } from '@nestjs/common';

type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface customerStatus{
   id: number;
   status: RequestStatus;
   rejectionReason?: string;
}

@Injectable()
export class RequestsService {


}
