import * as React from "react";
import { NativeBaseProvider } from "native-base";

import Routes  from './src/routes'
import Home from './src/pages'

export default function App() {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
}