import {frontend, PROJECT_ROOT} from './webpack.common';
import webpack, {ConfigurationFactory} from 'webpack';
import path from 'path';

const devOpts: webpack.Configuration = {
    entry: path.join(PROJECT_ROOT, 'src/client.ts'),
    devtool: 'inline-source-map',
    mode: 'development',
};

const front: ConfigurationFactory = (env, args) => {
    return Object.assign({}, frontend(env, args), devOpts);
};
// const back: ConfigurationFactory = (env, args) => {
//     return Object.assign({}, backend(env, args), devOpts);
// };

// module.exports = [front, back];
module.exports = [front];
