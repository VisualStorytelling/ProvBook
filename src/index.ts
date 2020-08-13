import { IDisposable, DisposableDelegate } from "@lumino/disposable";
import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";
import { ToolbarButton } from "@jupyterlab/apputils";
import { DocumentRegistry } from "@jupyterlab/docregistry";
import {
  NotebookActions,
  NotebookPanel,
  INotebookModel
} from "@jupyterlab/notebook";

// import { jupyterIcon } from "@jupyterlab/ui-components";

/**
 * The plugin registration information.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  activate,
  id: "my-extension-name:buttonPlugin",
  autoStart: true
};

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export class ButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
  /**
   * Create a new extension object.
   */
  createNew(
    panel: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>
  ): IDisposable {
    let callback = () => {
      alert("button clicked");
      NotebookActions.runAll(panel.content, context.sessionContext);
    };

    let button = new ToolbarButton({
      className: "myButton",
      icon: {
        name: "icon:provenance",
        svgstr: `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M125.7 51.7C124.4 50.7 122.5 50.9 121.5 52.2L118.3 56.2C114.5 29.5 91.6 9 64 9C49.3 9 35.5 14.7 25.2 25.2C24 26.4 24 28.3 25.2 29.4C26.4 30.6 28.3 30.6 29.4 29.4C38.6 20.1 50.9 15 64 15C88.7001 15 109.2 33.5 112.4 57.4L107.7 53.7C106.4 52.7 104.5 52.9 103.5 54.2C102.5 55.5 102.7 57.4 104 58.4L114 66.4C114.1 66.5 114.2 66.6 114.3 66.6C114.3 66.6 114.4 66.6 114.4 66.7C114.5 66.8 114.7 66.8 114.8 66.9C114.9 67 115.1 67 115.3 67C115.5 67 115.6 67 115.8 67C115.8 67 115.8 67 115.9 67C116.1 67 116.3 67 116.5 66.9C116.6 66.9 116.6 66.9 116.7 66.8C116.8 66.8 117 66.7 117.1 66.7C117.2 66.7 117.2 66.6 117.3 66.6C117.4 66.5 117.6 66.5 117.7 66.4C117.9 66.3 118 66.1 118.2 65.9L126.2 55.9C127.2 54.6 127 52.7 125.7 51.7Z" fill="#454B54"/>
                <path d="M64.9641 67.7769L78.6154 67.6654C80.5333 67.6654 82 66.1038 82 64.3192C82 62.4231 80.4205 60.9731 78.6154 60.9731L67.3333 61.0846L67.1077 42.3462C67.1077 40.45 65.641 39 63.7231 39C61.8051 39 60.3385 40.5615 60.3385 42.3462L60.4513 62.6462C60.2256 63.0923 60 63.65 60 64.3192C60 66.3269 61.6923 68 63.7231 68C64.1744 68 64.6256 67.8885 64.9641 67.7769Z" fill="#454B54"/>
                <path d="M100 64C100 44.1723 83.8773 28 64 28C44.1227 28 28 44.1723 28 64C28 83.8277 44.2331 100 64 100C83.7669 100 100 83.8277 100 64ZM34.6258 64C34.6258 47.8277 47.7669 34.6462 64 34.6462C80.2331 34.6462 93.3742 47.8277 93.3742 64C93.3742 80.1723 80.1227 93.3538 64 93.3538C47.8773 93.3538 34.6258 80.1723 34.6258 64Z" fill="#454B54"/>
                <path d="M98.6001 98.6C89.4001 107.9 77.1001 113 64.0001 113C39.3001 113 18.8001 94.5 15.6001 70.6L20.3001 74.3C20.9001 74.7 21.5001 75 22.2001 75C23.1001 75 24.0001 74.6 24.5001 73.9C25.5001 72.6 25.3001 70.7 24.0001 69.7L14.0001 61.7C13.9001 61.6 13.7001 61.5 13.5001 61.4C13.5001 61.4 13.4001 61.4 13.4001 61.3C13.3001 61.3 13.2001 61.2 13.1001 61.2H13.0001C12.9001 61.2 12.9001 61.2 12.8001 61.2C12.7001 61.2 12.6001 61.1 12.4001 61.1C12.3001 61.1 12.3001 61.1 12.2001 61.1C12.1001 61.1 11.9001 61.1 11.8001 61.1H11.7001C11.5001 61.1 11.3001 61.2 11.2001 61.2H11.1001C11.0001 61.2 10.8001 61.3 10.7001 61.4C10.6001 61.4 10.6001 61.5 10.5001 61.5C10.4001 61.6 10.3001 61.6 10.2001 61.7L10.1001 61.8C10.0001 61.9 9.80006 62 9.70006 62.2L1.70006 72.2C0.700056 73.5 0.900056 75.4 2.20006 76.4C3.50006 77.4 5.40006 77.2 6.40006 75.9L9.60006 71.9C13.5001 98.5 36.4001 119 64.0001 119C78.7001 119 92.5001 113.3 102.8 102.8C104 101.6 104 99.7 102.8 98.6C101.7 97.4 99.8001 97.4 98.6001 98.6Z" fill="#454B54"/>
                </svg>
                `
      },
      onClick: callback,
      tooltip: "ProvBook Lab"
    });

    panel.toolbar.insertItem(10, "runAll", button);
    return new DisposableDelegate(() => {
      button.dispose();
    });
  }
}

/**
 * Activate the extension.
 */
function activate(app: JupyterFrontEnd) {
  app.docRegistry.addWidgetExtension("Notebook", new ButtonExtension());
}

/**
 * Export the plugin as default.
 */
export default plugin;

/*
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import provbook from './provbook';
// import { NotebookPanel, Notebook, INotebookTracker } from '@jupyterlab/notebook';

/!**
 * Initialization data for the provbook extension.
 *!/
const extension: JupyterFrontEndPlugin<void> = {
  id: 'provbook',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('the JupyterLab main application:', app);
    provbook.register_provbook();
  }
};

export default extension;
*/

// /**
//  * Initialization data for the jupyterlab_nbprovenance extension.
//  */
// const plugin: JupyterFrontEndPlugin<void> = {
//   id: 'jupyterlab_nbprovenance',
//   autoStart: true,
//   requires: [ILayoutRestorer, INotebookTracker],
//   activate,
// };

// export default plugin;

// export const notebookModelCache = new Map<Notebook, NotebookProvenance>();

// function activate(app: JupyterLab, restorer: ILayoutRestorer, nbTracker: INotebookTracker): void {
//   nbTracker.widgetAdded.connect((_: INotebookTracker, nbPanel: NotebookPanel) => {
//     // wait until the session with the notebook model is ready
//     nbPanel.sessionContext.ready.then(() => {
//       const notebook: Notebook = nbPanel.content;
//       if (!notebookModelCache.has(notebook)) {
//         notebookModelCache.set(notebook, new NotebookProvenance(app, notebook));
//       }
//     });
//   });

//   const provenanceView = new SideBar(app.shell, nbTracker);
//   provenanceView.id = 'nbprovenance-view';
//   provenanceView.title.label = 'Notebook Provenance';
//   provenanceView.title.closable = true;
//   // provenanceView.title.iconRenderer = 'jp-nbprovenanceIcon';
//   // provenanceView.title.iconClass = 'jp-nbprovenanceIcon';

//   restorer.add(provenanceView, 'nbprovenance_view');

//   // Rank has been chosen somewhat arbitrarily
//   app.shell.add(provenanceView, 'left', { rank: 700 });
// }
