import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'project';

  displayedColumns: string[] = ['id', 'name', 'role', 'department', 'salary'];

  dataSource: User[] = [];

  constructor() {
    (pdfMake as any).vfs = pdfFonts['vfs'];
    this.generateData();
  }

  generateData() {
    const roles = ['Developer', 'Tester', 'Manager', 'HR', 'DevOps'];
    const departments = ['IT', 'QA', 'HR', 'Finance', 'Support'];

    for (let i = 1; i <= 120; i++) {
      this.dataSource.push({
        id: i,
        name: `User ${i}`,
        role: roles[i % roles.length],
        department: departments[i % departments.length],
        salary: 30000 + i * 500,
      });
    }
  }

  downloadPDF() {
    const tableBody = [
      ['ID', 'Name', 'Role', 'Department', 'Salary'],

      ...this.dataSource.map((item) => [
        item.id,
        item.name,
        item.role,
        item.department,
        item.salary,
      ]),
    ];

    const docDefinition: any = {
      pageSize: 'A4',
      pageOrientation: 'portrait',

      content: [
        { text: 'Employee Report (Large Data)', style: 'header' },

        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*', 'auto'],
            body: tableBody,
          },
          layout: 'lightHorizontalLines',
        },
      ],

      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('large-table.pdf');
  }
}
