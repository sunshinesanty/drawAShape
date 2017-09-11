module Weather.Directives {
    export interface IDropdownDrtv extends ng.IScope {
        default: string;
        isButton: boolean;
        ngModel: any;
        callback(item:any): any;
        select(item: any): void;
    }  
    export interface IAttributesEx extends ng.IAttributes {
        modelName: any;
    }

    export function dwDropdown(): ng.IDirective {
        return {
            restrict: 'EA',
            require: '^ngModel',
            scope: {
                ngModel: '=', // selection
                items: '=',   // items to select from
                callback: '&' // callback
            },
            templateUrl: '/OtherExcercise/Weather/html/DropdownTemplate.html',
            link: (scope: IDropdownDrtv, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
                element.on('click', function (event) {
                    event.preventDefault();
                });

                scope.default = 'select...';
                scope.isButton = 'isButton' in attrs;
  
                // selection changed handler
                scope.select = function (item) {
                    scope.ngModel = item;
                    if (scope.callback) {
                        scope.callback({ item: item });
                    }
                };
            }
        };
    };  
}


