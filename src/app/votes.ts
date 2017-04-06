import { Bill } from './bill';
import { Legislator } from './legislator';
import { LegislatorService} from './legislator.service'

export class Votes {
    roll_id: string;
    chamber: string;
    number: number;
    year: number;
    congress: number;
    voted_at: Date;
    vote_type: string;
    roll_type: string;
    question: string;
    required: number;
    result: string;
    source: string;
    bill_id: string;
    bill: Bill;
    nomination_id: string;
    nomination: {
        organization: string;
        received_on: Date;
        nominees: [
            {
                name: string;
                position: string;
                state: string;
            }
        ]
    };
    voter_ids: [
        {
            
        }
    ]

    voters: {

    }

}


