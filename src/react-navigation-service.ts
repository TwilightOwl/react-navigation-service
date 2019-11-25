import { InteractionManager } from 'react-native';
import {
  NavigationActions,
  NavigationNavigateAction,
  NavigationBackActionPayload,
  NavigationParams,
  NavigationContainerComponent,
  NavigationAction,
  StackActions
} from 'react-navigation';

import { aiWithAsyncInit, aiInit, aiMethod } from 'asynchronous-tools';

interface ServiceExtraParameters {
  resolveTimeout?: number,
  runAfterInteractions?: boolean
}

/**
 * Static service to get access to navigator from any place of the application
 *
 * @example
 * import { NavigationService } from 'gl-rnservices';
 * NavigationService.navigateTo(YUOR_ROUTE_NAME);
 *
 * @export
 * @class NavigationService
 */

@aiWithAsyncInit
class NavigationService {

  private container!: NavigationContainerComponent;

  private runAfterInteractions = (runAfterInteractions = false) => (
    (f: () => any) => runAfterInteractions ? InteractionManager.runAfterInteractions(f) : f()
  )

  private promiseWrapper = ({ resolveTimeout = 1500, runAfterInteractions = false }: ServiceExtraParameters) => (func: Function) =>
    this.runAfterInteractions(runAfterInteractions)(() => resolveTimeout 
      ? new Promise(resolve => {
          let result: any;
          setTimeout(() => resolve(result), resolveTimeout)
          result = func();
        })
      : func()
  )

  /**
   * Saves reference to navigator component instance
   *
   * @static
   * @param {NavigationContainerComponent} reference
   * @memberof NavigationService
   */
  @aiInit
  public setContainer(reference: NavigationContainerComponent) {
    if (reference) this.container = reference;
  }

  /**
   * Proxy method for dispatch
   */
  @aiMethod
  public dispatch(action: NavigationAction, { resolveTimeout = 1500, runAfterInteractions = false }: ServiceExtraParameters) {
    return this.promiseWrapper({ resolveTimeout, runAfterInteractions })(
      () => this.container.dispatch(action)
    )
  }

  // Some common navigation actions

  public navigate = (routeName: string, { resolveTimeout, runAfterInteractions, ...params }: NavigationParams & ServiceExtraParameters = {}) => (
    this.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
      { resolveTimeout, runAfterInteractions }
    )
  )

  public goBack = (options?: NavigationBackActionPayload, { resolveTimeout, runAfterInteractions }: ServiceExtraParameters = {}) => (
    this.dispatch(
      NavigationActions.back(options),
      { resolveTimeout, runAfterInteractions }
    )
  )

  // Some stack navigation actions

  public push = (routeName: string, { resolveTimeout, runAfterInteractions, ...params }: NavigationParams & ServiceExtraParameters = {}) => (
    this.dispatch(
      StackActions.push({
        routeName,
        params,
      }),
      { resolveTimeout, runAfterInteractions }
    )
  )

  // DEPRECATED!
  // @aiMethod
  // public navigateTo(routeName: string, params?: NavigationParams) {
  //   this.container.dispatch(
  //     NavigationActions.navigate(<NavigationNavigateAction>{
  //       type: NavigationActions.NAVIGATE,
  //       routeName,
  //       params
  //     })
  //   );
  // }

  // DEPRECATED!
  public navigateTo = this.navigate


  // DEPRECATED!
  // @aiMethod
  // public navigateBack(options?: NavigationBackActionPayload) {
  //   this.container.dispatch(NavigationActions.back(options));
  // }

  // DEPRECATED!
  public navigateBack = this.goBack

}

type Interface<T> = {
  [P in keyof T]: T[P]
}

// exclude private proerties from class
interface IIntermediator extends Interface<NavigationService> {};

class Intermediator implements IIntermediator {
  instance = new NavigationService()
  init = () => this.instance = new NavigationService()
  get setContainer() { return this.instance.setContainer.bind(this.instance) }
  get dispatch() { return this.instance.dispatch.bind(this.instance) }
  get navigate() { return this.instance.navigate.bind(this.instance) }
  get goBack() { return this.instance.goBack.bind(this.instance) }
  get push() { return this.instance.push.bind(this.instance) }
  // DEPRECATED!
  get navigateTo() { return this.instance.navigateTo.bind(this.instance) }
  get navigateBack() { return this.instance.navigateBack.bind(this.instance) }
}

export default new Intermediator()