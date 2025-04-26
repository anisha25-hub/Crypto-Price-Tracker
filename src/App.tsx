import { Provider } from 'react-redux';
import { store } from './store';
import CryptoTracker from './components/CryptoTracker';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <main className="container mx-auto px-4 py-8">
          <CryptoTracker />
        </main>
      </div>
    </Provider>
  );
}

export default App;