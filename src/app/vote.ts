import { Bill } from './bill';

export class Vote {
    bill?: Bill;
    question: string;
    required: number;
    result: string;
    roll_id: string;
    nomination?: {
        nomination_id: string;
        organization: string;
        received_on: Date;
        nominees: [
            {
                name: string;
                position: string;
                state: string;
            }
        ]
    }
    vote_type: string;
    voted_at: Date;
    voters: {};
}
