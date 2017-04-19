import { Bill } from './bill';

export class Vote {
    bill?: Bill;
    question: string;
    required: number;
    result: string;
    breakdown: {
        total: {
            Yea: number;
            Nay: number;
            Not_Voting: number;
            Present: number;
        },
        party: {
            R: {
                Yea: number;
                Nay: number;
                Not_Voting: number;
                Present: number;
            },
            D: {
                Yea: number;
                Nay: number;
                Not_Voting: number;
                Present: number;
            },
            I?: {
                Yea: number;
                Nay: number;
                Not_Voting: number;
                Present: number;
            }
        }
    }
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
