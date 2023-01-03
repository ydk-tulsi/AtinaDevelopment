import { Component,OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AsteroidService } from '../asteroid.service';
Chart.register(...registerables);

@Component({
  selector: 'app-neo-stats',
  templateUrl: './neo-stats.component.html',
  styleUrls: ['./neo-stats.component.scss']
})
export class NeoStatsComponent implements OnInit {

  speed: any = {};
  avarages: any = [];
  cData: any = {};

  chart!: Chart < 'bar',string[],string > ;
  constructor(private asteroidService: AsteroidService) {}

  onSubmitForm(stats: any) {
      let startdate: string = stats.startdate;
      let enddate: string = stats.enddate;

      this.asteroidService.getRange(startdate, enddate).subscribe((response: any) => {
          let totalAsteriod = Object.entries(response.near_earth_objects);
          console.log(totalAsteriod);
          let array: any = [];

          for (let earthObj in response.near_earth_objects) {
              let asteriodObj = response.near_earth_objects[earthObj];
              for (let i = 0; i < asteriodObj.length; i++) {
                  array.push(asteriodObj[i]);
              }
          }
          console.log(array);
          
          let speed: any = [];

          for (let j = 0; j < array.length; j++) {
            speed.push(
                  array[j].close_approach_data[0].relative_velocity.kilometers_per_hour
              );
          }
          //console.log(speed);
          speed.sort(function(a: any, b: any) {
              return a - b;
          });

          let highestSpeed = speed[speed.length - 1];
          //console.log(highestSpeed);

          let speedObj: any = {};
          for (let k = 0; k < array.length; k++) {
              if (
                  array[k].close_approach_data[0].relative_velocity
                  .kilometers_per_hour === highestSpeed
              ) {
                speedObj.Id = array[k].id;
                speedObj.hihgestVelocity =
                      array[
                          k
                      ].close_approach_data[0].relative_velocity.kilometers_per_hour;
              }
          }
          //console.log(speedObj);
          this.speed = speedObj;

          let AsteriodSizeObj: any = {};
          for (let k = 0; k < array.length; k++) {
            AsteriodSizeObj.minSize =
                array[k].estimated_diameter.kilometers.estimated_diameter_min;
            AsteriodSizeObj.maxSize =
                array[k].estimated_diameter.kilometers.estimated_diameter_max;
            AsteriodSizeObj.id = array[k].id;
            let avarageSize =
                  (array[k].estimated_diameter.kilometers.estimated_diameter_min +
                      array[k].estimated_diameter.kilometers.estimated_diameter_max) /
                  2;
                  AsteriodSizeObj.avarage = avarageSize;
            this.avarages.push(AsteriodSizeObj);
          }
          console.log(this.avarages);

          //chart functionality
          console.log(totalAsteriod);
          let asteriodCount: any = [];
          let datecollection: any = [];
          for (let m = 0; m < totalAsteriod.length; m++) {
              let asteriodArray: any = totalAsteriod[m];
              for (let n = 0; n < asteriodArray.length; n++) {
                  if (n == 0) {
                    datecollection.push(asteriodArray[n]);
                  } else if (n == 1) {
                    asteriodCount.push(asteriodArray[n].length);
                  }

              }

          }
          this.cData.date = datecollection;
          this.cData.count = asteriodCount;

          this.chart = new Chart('asteriodChart', {
              type: 'bar',
              data: {
                  labels: this.cData.date,
                  datasets: [{
                      label: 'total number of asteroids for date range',
                      data: this.cData.count,
                      backgroundColor: 'green',
                  }, ],
              },
              options: {
                  aspectRatio: 3,
              },
          });
      });
  }

  ngOnInit(): void {}

}