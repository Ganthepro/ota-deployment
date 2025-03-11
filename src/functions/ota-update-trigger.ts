import { app, EventGridEvent, InvocationContext } from "@azure/functions";
import { DataDto } from "../dtos/data.dto";
import axios from "axios";
import { AutoUpdateDto, Module, ModuleConfigurationDto } from "../dtos/auto-update.dto";
import { Registry } from "azure-iothub";

const api = process.env.API_URL;

const registry = Registry.fromConnectionString(
	process.env.IOTHUB_CONNECTION_STRING
);

export async function otaUpdateTrigger(
	event: EventGridEvent,
	context: InvocationContext
): Promise<void> {
	const data = event.data as DataDto;
	context.log("Event grid function processed event:", event);
	const devices = (await registry.list()).responseBody;
	const deviceIds = devices.map((device) => device.deviceId);
	const tag = data.target.tag;
    
    const modules: ModuleConfigurationDto[] = Object.keys(Module).map((key) => {
        return {
            moduleId: Module[key],
            tag,
        }
    });
    try {
        await axios.post<void, void, AutoUpdateDto>(`${api}/deployment/auto-update`, {
            baseTemplateConfigurationId: "base-template",
            modules,
            deviceId: deviceIds,
        });
        console.log("OTA update Successful");
    } catch (error) {
        console.error("OTA update failed", error);
    }
}

app.eventGrid("otaUpdateTrigger", {
	handler: otaUpdateTrigger,
});
