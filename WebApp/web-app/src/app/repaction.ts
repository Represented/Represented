export class RepAction {
  id: number;
  leg_type: string;
  legislation: string;
  rep: {
    name: string;
    party: string;
    state: string;
    bodyOfCongress: string;
  }
  date: string;
  action: string;
  summary: string;
}
