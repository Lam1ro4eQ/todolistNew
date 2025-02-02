import {createRoot} from 'react-dom/client';
import './index.css';
import App from './app/App';
import {store} from './app/store';
import {Provider} from 'react-redux';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

