import { app, EventGridEvent, InvocationContext } from "@azure/functions";

export async function otaUpdateTrigger(event: EventGridEvent, context: InvocationContext): Promise<void> {
    context.log('Event grid function processed event:', event);
}

app.eventGrid('ota-update-trigger', {
    handler: otaUpdateTrigger
});
