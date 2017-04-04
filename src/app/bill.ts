export class Bill {
  bill_id: string;
  bill_type: string;
  chamber: string;
  committee_ids: string[];
  congress: number;
  cosponsors_count: number;
  enacted_as: {
    congress: number;
    law_type: string;
    number: number;
  }
  history: {
    active: Boolean;
    active_at: string;
    awaiting_signature: Boolean;
    enacted: Boolean;
    enacted_at: string;
    house_passage_result: string;
    house_passage_result_at: string;
    senate_passage_result: string;
    senate_passage_result_at: string;
    vetoed: Boolean;
  }
  introduced_on: string;
  last_action_at: string;
  last_version: {
    version_code: string;
    issued_on: string;
    version_name: string;
    bill_version_id: string;
    urls: {
      html: string;
      pdf: string;
      xml: string;
    }
    pages: number;
  }
  last_version_on: string;
  last_vote_at: string;
  number: number;
  official_title: string;
  popular_title: string;
  related_bill_ids: string[];
  short_title: string;
  sponsor: {
    first_name: string;
    last_name: string;
    middle_name: string;
    name_suffix: string;
    nickname: string;
    title: string;
  }
  sponsor_id: string;
  urls: {
    congress: string;
    govtrack: string;
  }
  withdrawn_cosponsors_count: number;
}
