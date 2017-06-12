import { Component, ViewChild, Input, OnChanges, SimpleChange } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
/**
 * Generated class for the Chart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {
    @ViewChild('lineCanvas') lineCanvas;
    lineChart: any;
    @Input() prices: any;
 
    constructor(public navCtrl: NavController) {
 		console.log("in chart constructor")

    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    	console.log('chang',changes)
    	if(changes.prices.currentValue != undefined){
    		console.log(this.prices)
	    	var labels = this.prices.map( price => price.created_at.substr(0,10))
	    	var data = this.prices.map( price => price.price)
	    	this.lineChart = new Chart(this.lineCanvas.nativeElement, {
	            type: 'line',
	            data: {
	                labels: labels,
	                datasets: [
	                    {
	                        label: "price",
	                        fill: 'origin',
	                        lineTension: 0.1,
	                        backgroundColor: "rgba(75,192,192,0.4)",
	                        borderColor: "rgba(75,192,192,1)",
	                        borderCapStyle: 'butt',
	                        borderDash: [],
	                        borderDashOffset: 0.0,
	                        borderJoinStyle: 'miter',
	                        pointBorderColor: "rgba(75,192,192,1)",
	                        pointBackgroundColor: "#fff",
	                        pointBorderWidth: 1,
	                        pointHoverRadius: 5,
	                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
	                        pointHoverBorderColor: "rgba(220,220,220,1)",
	                        pointHoverBorderWidth: 2,
	                        pointRadius: 1,
	                        pointHitRadius: 10,
	                        data: data,
	                        spanGaps: false,

	                    }
	                ]

	            }
 
        	});
    	
	 
	    }
    }
 
}
