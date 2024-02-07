import { runMyBuildTask } from './my-build-task.js';

import type { AppContext, Application, ApplicationInstance, AppDeployContext, AppBuildContext } from '@teambit/application';

/**
 * Your custom component app using Bit.
 */
export class MyBuildTask implements Application {
  /**
   * name of your app as recognized by Bit.
   */
  name = 'my-build-task';

  /**
   * runs your application in development mode.
   */
  async run(context: AppContext): Promise<ApplicationInstance> {
    // run your application, or invoke the service you need. usually app types use plain NodeJS or leverage dev tools like 
    // Vite, Webpack, or others. Use your imagination and go even further.
    runMyBuildTask();
    return;
  }

  /**
   * builds your application. if needed besides component build.
   */
  async build(context: AppBuildContext) {
    // this is the component build path.
    const componentPath = context.capsule.path;
    // your deployment function goes here
    return {};
  }

  /**
   * use this function to deploy your component to the chosen destination.
   */
  async deploy(context: AppDeployContext) {
    const componentPath = context.capsule.path;
    // use the context to access your component and deploy.
    return {
      url: 'https://my-website.com'
    }
  }

  /**
   * a shorthand method for creating
   * an instance of your application and use this
   * as a type.
   */
  static from() {
    return new MyBuildTask();
  }
}
    
/**
 * load the application to Bit.
 */    
export default new MyBuildTask();
