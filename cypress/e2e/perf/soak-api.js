import http from 'k6/http';
import { sleep } from 'k6';

//Workload:
export const options = {
  stages: [
    {duration: '5s', target: 5}, //Ramp-up, mais usuário do que o averageLoad
    {duration: '1m', target: 5}, //Platô, por mais tempo que o avergeLoad
    {duration: '5s', target: 0}, //Ramp-down, em 5s eu zero minhas VUs 
  ]
};

//Casos de testes: 
export default function() {
  http.get('https://test.k6.io'); //Entrando no endpoint
  sleep(1); //User thinkig time 
}
