import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

/**
 * Generated class for the ProductChartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-product-chart',
  templateUrl: 'product-chart.html',
})
export class ProductChart {

	private margin = {top: 20, right: 20, bottom: 30, left: 50};
	private width: number;
	private height: number;
	private x: any;
	private y: any;
	private svg: any;
	private line: d3Shape.Line<[number, number]>;
	private Stocks: Array<any> = []

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.width = 300 - this.margin.left - this.margin.right ;
		this.height = 200 - this.margin.top - this.margin.bottom;
	}

	ngOnInit() {
		this.Stocks  = [
		  {date: new Date("2010-01-01"), value: 210.73},
		  {date: new Date("2010-01-04"), value: 214.01},
		  {date: new Date("2010-01-05"), value: 214.38},
		  {date: new Date("2010-01-06"), value: 210.97},
		  {date: new Date("2010-01-07"), value: 210.58},
		  {date: new Date("2010-01-08"), value: 211.98},
		  {date: new Date("2010-01-11"), value: 210.11},
		  {date: new Date("2010-01-12"), value: 207.72},
		  {date: new Date("2010-01-13"), value: 210.65},
		  {date: new Date("2010-01-14"), value: 209.43},
		  {date: new Date("2010-01-15"), value: 205.93},
		  {date: new Date("2010-01-18"), value: 205.93},
		  {date: new Date("2010-01-19"), value: 215.04},
		  {date: new Date("2010-01-20"), value: 211.72},
		  {date: new Date("2010-01-21"), value: 208.07},
		  {date: new Date("2010-01-22"), value: 197.75},
		  {date: new Date("2010-01-25"), value: 203.08},
		  {date: new Date("2010-01-26"), value: 205.94},
		  {date: new Date("2010-01-27"), value: 207.88},
		  {date: new Date("2010-01-28"), value: 199.29},
		  {date: new Date("2010-01-29"), value: 192.06},
		  {date: new Date("2010-02-01"), value: 194.73},
		  {date: new Date("2010-02-02"), value: 195.86},
		  {date: new Date("2010-02-03"), value: 199.23},
		  {date: new Date("2010-02-04"), value: 192.05},
		  {date: new Date("2010-02-05"), value: 195.46},
		  {date: new Date("2010-02-08"), value: 194.12},
		  {date: new Date("2010-02-09"), value: 196.19},
		  {date: new Date("2010-02-10"), value: 195.12},
		  {date: new Date("2010-02-11"), value: 198.67},
		  {date: new Date("2010-02-12"), value: 200.38},
		  {date: new Date("2010-02-15"), value: 200.38},
		  {date: new Date("2010-02-16"), value: 203.40},
		  {date: new Date("2010-02-17"), value: 202.55},
		  {date: new Date("2010-02-18"), value: 202.93},
		  {date: new Date("2010-02-19"), value: 201.67},
		  {date: new Date("2010-02-22"), value: 200.42},
		  {date: new Date("2010-02-23"), value: 197.06},
		  {date: new Date("2010-02-24"), value: 200.66},
		  {date: new Date("2010-02-25"), value: 202.00},
		  {date: new Date("2010-02-26"), value: 204.62},
		  {date: new Date("2010-03-01"), value: 208.99},
		  {date: new Date("2010-03-02"), value: 208.85},
		  {date: new Date("2010-03-03"), value: 209.33},
		  {date: new Date("2010-03-04"), value: 210.71},
		  {date: new Date("2010-03-05"), value: 218.95},
		  {date: new Date("2010-03-08"), value: 219.08},
		  {date: new Date("2010-03-09"), value: 223.02},
		  {date: new Date("2010-03-10"), value: 224.84},
		  {date: new Date("2010-03-11"), value: 225.50},
		  {date: new Date("2010-03-12"), value: 226.60},
		  {date: new Date("2010-03-15"), value: 223.84},
		  {date: new Date("2010-03-16"), value: 224.45},
		  {date: new Date("2010-03-17"), value: 224.12},
		  {date: new Date("2010-03-18"), value: 224.65},
		  {date: new Date("2010-03-19"), value: 222.25},
		  {date: new Date("2010-03-22"), value: 224.75},
		  {date: new Date("2010-03-23"), value: 228.36},
		  {date: new Date("2010-03-24"), value: 229.37},
		  {date: new Date("2010-03-25"), value: 226.65},
		  {date: new Date("2010-03-26"), value: 230.90},
		  {date: new Date("2010-03-29"), value: 232.39},
		  {date: new Date("2010-03-30"), value: 235.84},
		  {date: new Date("2010-03-31"), value: 235.00},
		  {date: new Date("2010-04-01"), value: 235.97},
		  {date: new Date("2010-04-02"), value: 235.97},
		  {date: new Date("2010-04-05"), value: 238.49},
		  {date: new Date("2010-04-06"), value: 239.54},
		  {date: new Date("2010-04-07"), value: 240.60},
		  {date: new Date("2010-04-08"), value: 239.95},
		  {date: new Date("2010-04-09"), value: 241.79},
		  {date: new Date("2010-04-12"), value: 242.29},
		  {date: new Date("2010-04-13"), value: 242.43},
		  {date: new Date("2010-04-14"), value: 245.69},
		  {date: new Date("2010-04-15"), value: 248.92},
		  {date: new Date("2010-04-16"), value: 247.40},
		  {date: new Date("2010-04-19"), value: 247.07},
		  {date: new Date("2010-04-20"), value: 244.59},
		  {date: new Date("2010-04-21"), value: 259.22},
		  {date: new Date("2010-04-22"), value: 266.47},
		  {date: new Date("2010-04-23"), value: 270.83},
		  {date: new Date("2010-04-26"), value: 269.50},
		  {date: new Date("2010-04-27"), value: 262.04},
		  {date: new Date("2010-04-28"), value: 261.60},
		  {date: new Date("2010-04-29"), value: 268.64},
		  {date: new Date("2010-04-30"), value: 261.09},
		  {date: new Date("2010-05-03"), value: 266.35},
		  {date: new Date("2010-05-04"), value: 258.68},
		  {date: new Date("2010-05-05"), value: 255.98},
		  {date: new Date("2010-05-06"), value: 246.25},
		  {date: new Date("2010-05-07"), value: 235.86},
		  {date: new Date("2010-05-10"), value: 253.99},
		  {date: new Date("2010-05-11"), value: 256.52},
		  {date: new Date("2010-05-12"), value: 262.09},
		  {date: new Date("2010-05-13"), value: 258.36},
		  {date: new Date("2010-05-14"), value: 253.82},
		  {date: new Date("2010-05-17"), value: 254.22},
		  {date: new Date("2010-05-18"), value: 252.36},
		  {date: new Date("2010-05-19"), value: 248.34},
		  {date: new Date("2010-05-20"), value: 237.76},
		  {date: new Date("2010-05-21"), value: 242.32},
		  {date: new Date("2010-05-24"), value: 246.76},
		  {date: new Date("2010-05-25"), value: 245.22},
		  {date: new Date("2010-05-26"), value: 244.11},
		  {date: new Date("2010-05-27"), value: 253.35},
		  {date: new Date("2010-05-28"), value: 256.88},
		  {date: new Date("2010-05-31"), value: 256.88},
		  {date: new Date("2010-06-01"), value: 260.83},
		  {date: new Date("2010-06-02"), value: 263.95},
		  {date: new Date("2010-06-03"), value: 263.12},
		  {date: new Date("2010-06-04"), value: 255.96},
		  {date: new Date("2010-06-07"), value: 250.94},
		  {date: new Date("2010-06-08"), value: 249.33},
		  {date: new Date("2010-06-09"), value: 243.20},
		  {date: new Date("2010-06-10"), value: 250.51},
		  {date: new Date("2010-06-11"), value: 253.51},
		  {date: new Date("2010-06-14"), value: 254.28},
		  {date: new Date("2010-06-15"), value: 259.69},
		  {date: new Date("2010-06-16"), value: 267.25},
		  {date: new Date("2010-06-17"), value: 271.87},
		  {date: new Date("2010-06-18"), value: 274.07},
		  {date: new Date("2010-06-21"), value: 270.17},
		  {date: new Date("2010-06-22"), value: 273.85},
		  {date: new Date("2010-06-23"), value: 270.97},
		  {date: new Date("2010-06-24"), value: 269.00},
		  {date: new Date("2010-06-25"), value: 266.70},
		  {date: new Date("2010-06-28"), value: 268.30},
		  {date: new Date("2010-06-29"), value: 256.17},
		  {date: new Date("2010-06-30"), value: 251.53},
		  {date: new Date("2010-07-01"), value: 248.48},
		  {date: new Date("2010-07-02"), value: 246.94},
		  {date: new Date("2010-07-05"), value: 246.94},
		  {date: new Date("2010-07-06"), value: 248.63},
		  {date: new Date("2010-07-07"), value: 258.66},
		  {date: new Date("2010-07-08"), value: 258.09},
		  {date: new Date("2010-07-09"), value: 259.62},
		  {date: new Date("2010-07-12"), value: 257.28},
		  {date: new Date("2010-07-13"), value: 251.80},
		  {date: new Date("2010-07-14"), value: 252.73},
		  {date: new Date("2010-07-15"), value: 251.45},
		  {date: new Date("2010-07-16"), value: 249.90},
		  {date: new Date("2010-07-19"), value: 245.58},
		  {date: new Date("2010-07-20"), value: 251.89},
		  {date: new Date("2010-07-21"), value: 254.24},
		  {date: new Date("2010-07-22"), value: 259.02},
		  {date: new Date("2010-07-23"), value: 259.94},
		  {date: new Date("2010-07-26"), value: 259.28},
		  {date: new Date("2010-07-27"), value: 264.08},
		  {date: new Date("2010-07-28"), value: 260.96},
		  {date: new Date("2010-07-29"), value: 258.11},
		  {date: new Date("2010-07-30"), value: 257.25},
		  {date: new Date("2010-08-02"), value: 261.85},
		  {date: new Date("2010-08-03"), value: 261.93},
		  {date: new Date("2010-08-04"), value: 262.98},
		  {date: new Date("2010-08-05"), value: 261.70},
		  {date: new Date("2010-08-06"), value: 260.09},
		  {date: new Date("2010-08-09"), value: 261.75},
		  {date: new Date("2010-08-10"), value: 259.41},
		  {date: new Date("2010-08-11"), value: 250.19},
		  {date: new Date("2010-08-12"), value: 251.79},
		  {date: new Date("2010-08-13"), value: 249.10},
		  {date: new Date("2010-08-16"), value: 247.64},
		  {date: new Date("2010-08-17"), value: 251.97},
		  {date: new Date("2010-08-18"), value: 253.07},
		  {date: new Date("2010-08-19"), value: 249.88},
		  {date: new Date("2010-08-20"), value: 249.64},
		  {date: new Date("2010-08-23"), value: 245.80},
		  {date: new Date("2010-08-24"), value: 239.93},
		  {date: new Date("2010-08-25"), value: 242.89},
		  {date: new Date("2010-08-26"), value: 240.28},
		  {date: new Date("2010-08-27"), value: 241.62},
		  {date: new Date("2010-08-30"), value: 242.50},
		  {date: new Date("2010-08-31"), value: 243.10},
		  {date: new Date("2010-09-01"), value: 250.33},
		  {date: new Date("2010-09-02"), value: 252.17},
		  {date: new Date("2010-09-03"), value: 258.77},
		  {date: new Date("2010-09-06"), value: 258.77},
		  {date: new Date("2010-09-07"), value: 257.81},
		  {date: new Date("2010-09-08"), value: 262.92},
		  {date: new Date("2010-09-09"), value: 263.07},
		  {date: new Date("2010-09-10"), value: 263.41},
		  {date: new Date("2010-09-13"), value: 267.04},
		  {date: new Date("2010-09-14"), value: 268.06},
		  {date: new Date("2010-09-15"), value: 270.22},
		  {date: new Date("2010-09-16"), value: 276.57},
		  {date: new Date("2010-09-17"), value: 275.37},
		  {date: new Date("2010-09-20"), value: 283.23},
		  {date: new Date("2010-09-21"), value: 283.77},
		  {date: new Date("2010-09-22"), value: 287.75},
		  {date: new Date("2010-09-23"), value: 288.92},
		  {date: new Date("2010-09-24"), value: 292.32},
		  {date: new Date("2010-09-27"), value: 291.16},
		  {date: new Date("2010-09-28"), value: 286.86},
		  {date: new Date("2010-09-29"), value: 287.37},
		  {date: new Date("2010-09-30"), value: 283.75},
		  {date: new Date("2010-10-01"), value: 282.52},
		  {date: new Date("2010-10-04"), value: 278.64},
		  {date: new Date("2010-10-05"), value: 288.94},
		  {date: new Date("2010-10-06"), value: 289.19},
		  {date: new Date("2010-10-07"), value: 289.22},
		  {date: new Date("2010-10-08"), value: 294.07},
		  {date: new Date("2010-10-11"), value: 295.36},
		  {date: new Date("2010-10-12"), value: 298.54},
		  {date: new Date("2010-10-13"), value: 300.14},
		  {date: new Date("2010-10-14"), value: 302.31},
		  {date: new Date("2010-10-15"), value: 314.74},
		  {date: new Date("2010-10-18"), value: 318.00},
		  {date: new Date("2010-10-19"), value: 309.49},
		  {date: new Date("2010-10-20"), value: 310.53},
		  {date: new Date("2010-10-21"), value: 309.52},
		  {date: new Date("2010-10-22"), value: 307.47},
		  {date: new Date("2010-10-25"), value: 308.84},
		  {date: new Date("2010-10-26"), value: 308.05},
		  {date: new Date("2010-10-27"), value: 307.83},
		  {date: new Date("2010-10-28"), value: 305.24},
		  {date: new Date("2010-10-29"), value: 300.98},
		  {date: new Date("2010-11-01"), value: 304.18},
		  {date: new Date("2010-11-02"), value: 309.36},
		  {date: new Date("2010-11-03"), value: 312.80},
		  {date: new Date("2010-11-04"), value: 318.27},
		  {date: new Date("2010-11-05"), value: 317.13},
		  {date: new Date("2010-11-08"), value: 318.62},
		  {date: new Date("2010-11-09"), value: 316.08},
		  {date: new Date("2010-11-10"), value: 318.03},
		  {date: new Date("2010-11-11"), value: 316.66},
		  {date: new Date("2010-11-12"), value: 308.03},
		  {date: new Date("2010-11-15"), value: 307.04},
		  {date: new Date("2010-11-16"), value: 301.59},
		  {date: new Date("2010-11-17"), value: 300.50},
		  {date: new Date("2010-11-18"), value: 308.43},
		  {date: new Date("2010-11-19"), value: 306.73},
		  {date: new Date("2010-11-22"), value: 313.36},
		  {date: new Date("2010-11-23"), value: 308.73},
		  {date: new Date("2010-11-24"), value: 314.80},
		  {date: new Date("2010-11-26"), value: 315.00},
		  {date: new Date("2010-11-29"), value: 316.87},
		  {date: new Date("2010-11-30"), value: 311.15},
		  {date: new Date("2010-12-01"), value: 316.40},
		  {date: new Date("2010-12-02"), value: 318.15},
		  {date: new Date("2010-12-03"), value: 317.44},
		  {date: new Date("2010-12-06"), value: 320.15},
		  {date: new Date("2010-12-07"), value: 318.21},
		  {date: new Date("2010-12-08"), value: 321.01},
		  {date: new Date("2010-12-09"), value: 319.76},
		  {date: new Date("2010-12-10"), value: 320.56},
		  {date: new Date("2010-12-13"), value: 321.67},
		  {date: new Date("2010-12-14"), value: 320.29},
		  {date: new Date("2010-12-15"), value: 320.36},
		  {date: new Date("2010-12-16"), value: 321.25},
		  {date: new Date("2010-12-17"), value: 320.61},
		  {date: new Date("2010-12-20"), value: 322.21},
		  {date: new Date("2010-12-21"), value: 324.20},
		  {date: new Date("2010-12-22"), value: 325.16},
		  {date: new Date("2010-12-23"), value: 323.60},
		  {date: new Date("2010-12-27"), value: 324.68},
		  {date: new Date("2010-12-28"), value: 325.47},
		  {date: new Date("2010-12-29"), value: 325.29},
		  {date: new Date("2010-12-30"), value: 323.66},
		  {date: new Date("2010-12-31"), value: 322.56},
		  {date: new Date("2011-01-03"), value: 329.57},
		  {date: new Date("2011-01-04"), value: 331.29},
		  {date: new Date("2011-01-05"), value: 334.00},
		  {date: new Date("2011-01-06"), value: 333.73},
		  {date: new Date("2011-01-07"), value: 336.12},
		  {date: new Date("2011-01-10"), value: 342.46},
		  {date: new Date("2011-01-11"), value: 341.64},
		  {date: new Date("2011-01-12"), value: 344.42},
		  {date: new Date("2011-01-13"), value: 345.68},
		  {date: new Date("2011-01-14"), value: 348.48},
		  {date: new Date("2011-01-18"), value: 340.65},
		  {date: new Date("2011-01-19"), value: 338.84},
		  {date: new Date("2011-01-20"), value: 332.68},
		  {date: new Date("2011-01-21"), value: 326.72},
		  {date: new Date("2011-01-24"), value: 337.45},
		  {date: new Date("2011-01-25"), value: 341.40},
		  {date: new Date("2011-01-26"), value: 343.85},
		  {date: new Date("2011-01-27"), value: 343.21},
		  {date: new Date("2011-01-28"), value: 336.10},
		  {date: new Date("2011-01-31"), value: 339.32},
		  {date: new Date("2011-02-01"), value: 345.03},
		  {date: new Date("2011-02-02"), value: 344.32},
		  {date: new Date("2011-02-03"), value: 343.44},
		  {date: new Date("2011-02-04"), value: 346.50},
		  {date: new Date("2011-02-07"), value: 351.88},
		  {date: new Date("2011-02-08"), value: 355.20},
		  {date: new Date("2011-02-09"), value: 358.16},
		  {date: new Date("2011-02-10"), value: 354.54},
		  {date: new Date("2011-02-11"), value: 356.85},
		  {date: new Date("2011-02-14"), value: 359.18},
		  {date: new Date("2011-02-15"), value: 359.90},
		  {date: new Date("2012-04-18"), value: 608.34},
		  {date: new Date("2012-04-19"), value: 587.44},
		  {date: new Date("2012-04-20"), value: 572.98},
		  {date: new Date("2012-04-23"), value: 571.70},
		  {date: new Date("2012-04-24"), value: 560.28},
		  {date: new Date("2012-04-25"), value: 610.00},
		  {date: new Date("2012-04-26"), value: 607.70},
		  {date: new Date("2012-04-27"), value: 603.00},
		  {date: new Date("2012-04-30"), value: 583.98},
		  {date: new Date("2012-05-01"), value: 800.13},
		];

		this.initSvg()
		this.initAxis();
		this.drawAxis();
		this.drawLine();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProductChartPage');
	}
	private initSvg() {
		this.svg = d3.select("svg")
	             .append("g")
	             .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
	}

	private initAxis() {
		this.x = d3Scale.scaleTime().range([0, this.width]);
		this.y = d3Scale.scaleLinear().range([this.height, 0]);
		this.x.domain(d3Array.extent(this.Stocks, (d) => d.date ));
		this.y.domain(d3Array.extent(this.Stocks, (d) => d.value ));
	}

	private drawAxis() {

		this.svg.append("g")
		      .attr("class", "axis axis--x")
		      .attr("transform", "translate(0," + this.height + ")")
		      .call(d3Axis.axisBottom(this.x));

		this.svg.append("g")
		      .attr("class", "axis axis--y")
		      .call(d3Axis.axisLeft(this.y))
		      .append("text")
		      .attr("class", "axis-title")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Price ($)");
	}

	private drawLine() {
		this.line = d3Shape.line()
		                   .x( (d: any) => this.x(d.date) )
		                   .y( (d: any) => this.y(d.value) );

		this.svg.append("path")
		        .datum(this.Stocks)
		        .attr("class", "line")
		        .attr("d", this.line);
	}

}
