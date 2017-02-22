System.register(['angular2/core', '@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var MTEComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            MTEComponent = (function () {
                function MTEComponent() {
                    this.seriesAData = [];
                    this.seriesBData = [];
                    this.lineChartData = [
                        { data: this.seriesAData, label: 'Incidents Month Wise' }
                    ];
                    this.lineChartLabels = this.seriesBData;
                    this.lineChartOptions = {
                        responsive: true
                    };
                    this.lineChartColors = [
                        {
                            backgroundColor: 'rgba(148,159,177,0.2)',
                            borderColor: 'rgba(148,159,177,1)',
                            pointBackgroundColor: 'rgba(148,159,177,1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                        }
                    ];
                    this.lineChartLegend = true;
                    this.lineChartType = 'line';
                }
                MTEComponent.prototype.fileChange = function (event) {
                    var fileList = event.target.files;
                    if (fileList.length > 0) {
                        var file = fileList[0];
                        var formData = new FormData();
                        formData.append('uploadFile', file, file.name);
                        var headers = new Headers();
                        headers.append('Content-Type', 'multipart/form-data');
                        headers.append('Accept', 'application/json');
                        var options = new http_1.RequestOptions({ headers: headers });
                        this.http.post("" + this.apiEndPoint, formData, options)
                            .map(function (res) { return res.json(); })
                            .catch(function (error) { return Observable.throw(error); })
                            .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
                    }
                };
                MTEComponent.prototype.loadData = function () {
                    var url = "app/Demo_excel.xlsx";
                    console.log('Sanket1');
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET", url, true);
                    oReq.responseType = "arraybuffer";
                    oReq.onload = function (e) {
                        var arraybuffer = oReq.response;
                        /* convert data to binary string */
                        var data = new Uint8Array(arraybuffer);
                        var arr = new Array();
                        for (var i = 0; i != data.length; ++i)
                            arr[i] = String.fromCharCode(data[i]);
                        var bstr = arr.join("");
                        /* Call XLSX */
                        var workbook = XLSX.read(bstr, { type: "binary" });
                        var total_incidents_sheet = workbook.SheetNames[0];
                        var month_wise_sheet = workbook.SheetNames[1];
                        var day_wise_sheet = workbook.SheetNames[2];
                        console.log("sheet name : " + total_incidents_sheet);
                        console.log("sheet name : " + month_wise_sheet);
                        var worksheet_incidents = workbook.Sheets[total_incidents_sheet];
                        var worksheet_months = workbook.Sheets[month_wise_sheet];
                        var worksheet_days = workbook.Sheets[day_wise_sheet];
                        console.log(XLSX.utils.sheet_to_json(worksheet_incidents));
                        var excelData = XLSX.utils.sheet_to_json(worksheet_incidents, { raw: true });
                        var excelData_month = XLSX.utils.sheet_to_json(worksheet_months, { raw: true });
                        var excelData_days = XLSX.utils.sheet_to_json(worksheet_days, { raw: true });
                        console.log("Testing..." + excelData_month);
                        localStorage.setItem('excelData', JSON.stringify(excelData));
                        localStorage.setItem('excelData_month', JSON.stringify(excelData_month));
                        localStorage.setItem('excelData_days', JSON.stringify(excelData_days));
                    };
                    oReq.send();
                    this.excelDataSample = JSON.parse(localStorage.getItem('excelData'));
                    this.excelDataSample_month = JSON.parse(localStorage.getItem('excelData_month'));
                    this.excelDataSample_days = JSON.parse(localStorage.getItem('excelData_days'));
                    console.log(this.excelDataSample_month);
                    console.log('Sanket4');
                    for (var i = 0; i < this.excelDataSample_month.length; i++) {
                        console.log("PAIR " + i + ": " + this.excelDataSample_month[i].Data);
                        console.log("PAIR " + i + ": " + this.excelDataSample_month[i].Month);
                        this.seriesAData[i] = this.excelDataSample_month[i].Data;
                        this.seriesBData[i] = this.excelDataSample_month[i].Month;
                    }
                };
                MTEComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/mte.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], MTEComponent);
                return MTEComponent;
            }());
            exports_1("MTEComponent", MTEComponent);
        }
    }
});
//# sourceMappingURL=mte.component.js.map