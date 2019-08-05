import { Component, ElementRef, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CopyService } from '../../services/copy.service';
import { ExampleFile } from './example-file';
import { AlertService } from '../../../../../library/src/lib/alert/alert-service/alert.service';
import { height } from '../../utilities/animations/collapse';
import sdk from '@stackblitz/sdk';
@Component({
    selector: 'code-example',
    templateUrl: './code-example.component.html',
    styleUrls: ['./code-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [height({ time: 200 })]
})
export class CodeExampleComponent implements OnInit {

    get expandIcon(): string {
        return this.isOpen ? 'navigation-up-arrow' : 'navigation-down-arrow';
    }

    /**
     * List of files to display in this code example.
     */
    @Input()
    exampleFiles: ExampleFile[] = [];

    smallScreen: boolean;

    selectedFileIndex: number = 0;

    isOpen: boolean = false;

    constructor(private element: ElementRef,
        private copyService: CopyService,
        private alertService: AlertService) { }

    copyText(): void {
        this.copyService.copyText(this.exampleFiles[this.selectedFileIndex].code);
        this.alertService.open('Code copied!', { type: 'success', duration: 5000 });
    }

    openCode(): void {
        this.exampleFiles.forEach((example) => {
            const _path = `src/app/${example.name}`;
            project.files[_path] = example.code;
            if (example.tagname) {
                parameters.html_tag = example.tagname;
                parameters.app_component = example.component;
            }
        });
        project.files['src/index.html'] = `
        <link rel="stylesheet" href="node_modules/fundamental-styles/dist/fundamental-styles.min.css">
            <${parameters.html_tag}></${parameters.html_tag}>
        `;

        project.files['src/app/app.module.ts'] = `
        import { BrowserModule } from '@angular/platform-browser';
        import { NgModule } from '@angular/core';
        import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
        import { AlertModule } from 'fundamental-ngx';
        import { ${parameters.app_component} } from './${parameters.app_component_basis}';
        
        @NgModule({
          declarations: [
            ${parameters.app_component}
          ],
          imports: [
            BrowserModule,
            AlertModule,
            BrowserAnimationsModule
          ],
          providers: [],
          bootstrap: [${parameters.app_component}]
        })
        export class ${parameters.app_module} { }
        `;

        console.log(project);
        sdk.openProject(project);
    }

    ngOnInit(): void {
        this.smallScreen = window.innerWidth <= 768;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.smallScreen = window.innerWidth <= 768;
    }
}

const parameters = {
    'html_tag': 'deno-root',
    'app_module': 'AppModule',
    'app_module_file': 'app.module',
    'app_component': 'AlertComponent',
    'app_component_basis': 'alert-example.component',
    'app_component_html': 'alert-example.component.html',
    'app_component_ts': 'alert-example.component.ts',
    'app_component_html_path': 'src/app/alert-example.component.html',
    'app_component_ts_path': 'src/app/alert-example.component.ts'
};

const angular_json = `
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "my-fd-ngx-dream": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/my-fd-ngx-dream",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": false,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "node_modules/fundamental-styles/dist/fundamental-styles.min.css",
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "my-fd-ngx-dream:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "my-fd-ngx-dream:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "my-fd-ngx-dream:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "my-fd-ngx-dream:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "my-fd-ngx-dream:serve:production"
            }
          }
        }
      }
    }
  },
  "defaultProject": "my-fd-ngx-dream"
}
`;

const polyfills = `
import 'zone.js/dist/zone';  // Included with Angular CLI.
import 'core-js/es7/reflect';
`;

const maints = `
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ${parameters.app_module} } from './app/${parameters.app_module_file}';

platformBrowserDynamic().bootstrapModule(${parameters.app_module})
  .catch(err => console.error(err));
`;

const app_app_component = `
import { Component } from '@angular/core';

@Component({
  selector: '${parameters.html_tag}',
  templateUrl: './${parameters.app_component_html}'
})
export class ${parameters.app_component} {
  title = 'my-fd-ngx-dream-app';
}
`;

const app_app_component_html = `
<fd-alert [type]="'warning'">
    A dismissible warning alert.
</fd-alert>
`;

// Create the project payload.
const project = {
    files: {
        'src/main.ts': maints,
        'src/polyfills.ts': polyfills,
        'angular.json': angular_json,
        'src/styles.scss': ''
    },
    title: 'Fundamental-NGX Example',
    description: 'Generated for you by fundamental-ngx team',
    template: 'angular-cli',
    tags: ['stackblitz', 'sdk'],
    dependencies: {
        moment: '*',
        'fundamental-ngx': '*',
        'fundamental-styles': '0.1.0',
        '@angular/animations': '*'
    }
};

