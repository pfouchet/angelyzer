import {Validator} from './validator';
import {RuleEnum} from '../model/rule.enum';
import {elementNotInWrightPlace, elementsNotInWrightPlace} from '../template/element-not-in-wright-place.template';
import {Validation} from '../model/validation.model';
import {AngularModule} from '../model/angular-module.model';
/**
 * Angular Modules Imports validator
 */
export class ImportsValidator implements Validator {
    /**
     * validate if the given module does not have other objects thant Modules in imports
     * @param module
     * @param ast
     * @returns {Validation}
     */
    validate(module: AngularModule, ast?: any): Validation {
        const listOfImportsViolations = [];
        for (const anImport of module.imports) {
            if (!anImport.match(/.+Module$/)) {
                listOfImportsViolations.push(elementNotInWrightPlace(anImport, 'imports'));
            }
        }
        if (listOfImportsViolations.length > 0) {
            return new Validation({
                rule: RuleEnum.IMPORT_NON_MODULE.toString(),
                className: module.name,
                error: elementsNotInWrightPlace(listOfImportsViolations)
            });
        }
        return null;
    }

}