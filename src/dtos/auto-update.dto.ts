export type ModuleConfigurationDto = {
    moduleId: Module;
    tag?: string;
}

export type AutoUpdateDto = {
    baseTemplateConfigurationId: string;
    modules: ModuleConfigurationDto[];
    deviceId: string[];
};
    
export enum Module {
    RabbitMQ = 'rabbitmq',
    Postgres = 'postgres',
    DataLoggerAgent = 'data-logger',
    IQASensorAgent = 'iaq-sensor',
    API = 'api',
}
