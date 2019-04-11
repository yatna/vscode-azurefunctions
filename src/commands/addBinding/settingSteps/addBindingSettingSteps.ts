/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureWizardPromptStep } from "vscode-azureextensionui";
import { IFunctionSetting, ValueType } from "../../../templates/IFunctionSetting";
import { IBindingWizardContext } from "../IBindingWizardContext";
import { BindingNameStep } from "./BindingNameStep";
import { BooleanPromptStep } from "./BooleanPromptStep";
import { EnumPromptStep } from "./EnumPromptStep";
import { LocalAppSettingListStep } from "./LocalAppSettingListStep";
import { StringPromptStep } from "./StringPromptStep";

export function addBindingSettingSteps(settings: IFunctionSetting[], promptSteps: AzureWizardPromptStep<IBindingWizardContext>[]): void {
    for (const setting of settings) {
        if (setting.name.toLowerCase() === 'name') {
            promptSteps.push(new BindingNameStep(setting));
        } else if (setting.resourceType !== undefined) {
            promptSteps.push(new LocalAppSettingListStep(setting));
        } else {
            switch (setting.valueType) {
                case ValueType.boolean:
                    promptSteps.push(new BooleanPromptStep(setting));
                    break;
                case ValueType.enum:
                    promptSteps.push(new EnumPromptStep(setting));
                    break;
                default:
                    // Default to 'string' type for any valueType that isn't supported
                    promptSteps.push(new StringPromptStep(setting));
                    break;
            }
        }
    }
}
