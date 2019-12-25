import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
import { HomeComponent } from "./components/rsur/home/home.component";

export class CustomReuseStrategy implements RouteReuseStrategy {
	handlers: { [key: string]: DetachedRouteHandle } = {};

	shouldDetach(route: ActivatedRouteSnapshot): boolean {
		return ['rsur/results-list'].indexOf(route.routeConfig.path) > -1;
	}
	store(route: ActivatedRouteSnapshot, handle: {}): void {
		this.handlers[route.routeConfig.path] = handle;
	}
	shouldAttach(route: ActivatedRouteSnapshot): boolean {
		return !!this.handlers[route.routeConfig.path];
	}
	retrieve(route: ActivatedRouteSnapshot): {} {
		if (route.routeConfig) {
			return this.handlers[route.routeConfig.path];
		}
	}
	shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
		return future.routeConfig === curr.routeConfig;
	}

}