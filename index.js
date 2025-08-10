module.exports = function (config) {
    const assetsUrl = 'https://raw.githubusercontent.com/0Chel1/screepsmod-testMod/refs/heads/main/';

    if (config.backend) {
        config.backend.customObjectTypes.gift = {
            sidepanel: '<div><label>Description:</label><span>This is a gift</span></div>'
        };

        config.backend.renderer.resources['my_gift_texture'] = `${assetsUrl}gift.png`;
        config.backend.renderer.metadata['gift'] = {
            processors: [
                {
                    type: 'sprite',
                    once: true,
                    payload: {
                        texture: 'my_gift_texture',
                        width: 100,
                        height: 100,
                    }
                }
            ]
        };

        config.backend.customObjectTypes.megumin = {
            sidepanel: '<div><label>Description:</label><span>This is Megumin.</span></div>'
        };

        config.backend.renderer.resources['megumin_texture'] = `${assetsUrl}animegirl.png`;
        config.backend.renderer.metadata['megumin'] = {
            processors: [
                {
                    type: 'sprite',
                    once: true,
                    payload: {
                        texture: 'megumin_texture',
                        width: 400,
                        height: 500,
                    }
                }
            ]
        };
    }

    if (config.cronjobs) {
        // it runs once a year
        config.cronjobs.genMyCustomStructures = [365 * 24 * 60 * 60, async ({ utils }) => {
            const { db, env } = config.common.storage;
            // run once
            // checks if a env variable myCustomStructuresWereGenerated was set. If so, do nothing
            if (await env.get('myCustomStructuresWereGenerated')) {
                return;
            }

            // spawn objects
            await db['rooms.objects'].insert({ room: 'W7N3', x: 25, y: 25, type: 'megumin' });

            // set the env variable
            await env.set('myCustomStructuresWereGenerated', 1);
        }];
    }
}