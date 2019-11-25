import { NavigationBackActionPayload, NavigationParams, NavigationContainerComponent, NavigationAction } from 'react-navigation';
interface ServiceExtraParameters {
    resolveTimeout?: number;
    runAfterInteractions?: boolean;
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
declare class NavigationService {
    private container;
    private runAfterInteractions;
    private promiseWrapper;
    /**
     * Saves reference to navigator component instance
     *
     * @static
     * @param {NavigationContainerComponent} reference
     * @memberof NavigationService
     */
    setContainer(reference: NavigationContainerComponent): void;
    /**
     * Proxy method for dispatch
     */
    dispatch(action: NavigationAction, { resolveTimeout, runAfterInteractions }: ServiceExtraParameters): any;
    navigate: (routeName: string, { resolveTimeout, runAfterInteractions, ...params }?: NavigationParams & ServiceExtraParameters) => any;
    goBack: (options?: NavigationBackActionPayload | undefined, { resolveTimeout, runAfterInteractions }?: ServiceExtraParameters) => any;
    push: (routeName: string, { resolveTimeout, runAfterInteractions, ...params }?: NavigationParams & ServiceExtraParameters) => any;
    navigateTo: (routeName: string, { resolveTimeout, runAfterInteractions, ...params }?: NavigationParams & ServiceExtraParameters) => any;
    navigateBack: (options?: NavigationBackActionPayload | undefined, { resolveTimeout, runAfterInteractions }?: ServiceExtraParameters) => any;
}
declare type Interface<T> = {
    [P in keyof T]: T[P];
};
interface IIntermediator extends Interface<NavigationService> {
}
declare class Intermediator implements IIntermediator {
    instance: NavigationService;
    init: () => NavigationService;
    readonly setContainer: (reference: NavigationContainerComponent) => void;
    readonly dispatch: (action: NavigationAction, { resolveTimeout, runAfterInteractions }: ServiceExtraParameters) => any;
    readonly navigate: (routeName: string, { resolveTimeout, runAfterInteractions, ...params }?: NavigationParams & ServiceExtraParameters) => any;
    readonly goBack: (options?: NavigationBackActionPayload | undefined, { resolveTimeout, runAfterInteractions }?: ServiceExtraParameters) => any;
    readonly push: (routeName: string, { resolveTimeout, runAfterInteractions, ...params }?: NavigationParams & ServiceExtraParameters) => any;
    readonly navigateTo: (routeName: string, { resolveTimeout, runAfterInteractions, ...params }?: NavigationParams & ServiceExtraParameters) => any;
    readonly navigateBack: (options?: NavigationBackActionPayload | undefined, { resolveTimeout, runAfterInteractions }?: ServiceExtraParameters) => any;
}
declare const _default: Intermediator;
export default _default;
