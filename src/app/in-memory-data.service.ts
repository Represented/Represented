import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    //return{heroes};
    let actions = [
      {
        id: 1,
        leg_type: 'Bill',
        legislation: 'S.595',
        rep: {
          name: 'Ron Johnson',
          party: 'R',
          state: 'WI',
          bodyOfCongress: 'Senate',
        },
        action: 'Cosponsor',
        date: '03/09/2017',
        summary: 'A bill to provide U.S. Customs and Border Protection with additional flexibility to expedite the hiring process for applicants for law enforcement positions, and for other purposes.'
      },
      {
        id: 2,
        leg_type: 'Bill',
        legislation: 'S.585',
        rep: {
          name: 'Ron Johnson',
          party: 'R',
          state: 'WI',
          bodyOfCongress: 'Senate',
        },
        date: '03/08/2017',
        action: 'Sponsor',
        summary: 'A bill to provide greater whistleblower protections for Federal employees, increased awareness of Federal whistleblower protections, and increased accountability and required discipline for Federal supervisors who retaliate against whistleblowers, and for other purposes.'
      },
      {
        id: 3,
        leg_type: 'Bill',
        legislation: 'S.582',
        rep: {
          name: 'Ron Johnson',
          party: 'R',
          state: 'WI',
          bodyOfCongress: 'Senate',
        },
        date: '03/08/2017',
        action: 'Sponsor',
        summary: 'A bill to reauthorize the Office of Special Counsel, and for other purposes.'
      },
      {
        id: 4,
        leg_type: 'Bill',
        legislation: 'S.576',
        rep: {
          name: 'Ron Johnson',
          party: 'R',
          state: 'WI',
          bodyOfCongress: 'Senate',
        },
        date: '03/08/2017',
        action: 'Sponsor',
        summary: 'A bill to amend title 5, United States Code, to extend certain protections against prohibited personnel practices, and for other purposes.'
      },
      {
        id: 5,
        leg_type: 'Resolution',
        legislation: 'S.J.Res.34',
        rep: {
          name: 'Ron Johnson',
          party: 'R',
          state: 'WI',
          bodyOfCongress: 'Senate',
        },
        date: '03/07/2017',
        action: 'Cosponsor',
        summary: 'A joint resolution providing for congressional disapproval under chapter 8 of title 5, United States Code, of the rule submitted by the Federal Communications Commission relating to "Protecting the Privacy of Customers of Broadband and Other Telecommunications Services".'
      },
      {
        id: 6,
        leg_type: 'Resolution',
        legislation: 'S.J.Res.81',
        rep: {
          name: 'Ron Johnson',
          party: 'R',
          state: 'WI',
          bodyOfCongress: 'Senate',
        },
        date: '03/07/2017',
        action: 'Cosponsor',
        summary: 'A resolution recognizing the 196th anniversary of the independence of Greece and celebrating democracy in Greece and the United States.'
      }
    ];
    return {heroes, actions};
  }
}
