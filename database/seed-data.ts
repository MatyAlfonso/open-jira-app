interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: English homework (future simple - be going to)',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In progress: English homework ("The Arm Of Liberty" text)',
            status: 'in-progress',
            createdAt: (Date.now() - 1000000)
        },
        {
            description: 'Finished: English homework (present perfect - past simple)',
            status: 'finished',
            createdAt: (Date.now() - 100000)
        },
    ]
}