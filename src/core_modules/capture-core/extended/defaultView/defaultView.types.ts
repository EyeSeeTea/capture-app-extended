export type DefaultView = {
    programId: string;
    templateId: string;
};

export type DefaultViewsConfig = Readonly<Record<string, DefaultView>>;
