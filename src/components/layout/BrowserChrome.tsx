
import BrowserTabsBar from "./BrowserTabsBar";
import BrowserAddressBar from "./BrowserAddressBar";

interface BrowserChromeProps {
  children: React.ReactNode;
}

const BrowserChrome = ({ children }: BrowserChromeProps) => {
  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-md overflow-hidden shadow-md">
      <BrowserTabsBar />
      <BrowserAddressBar />
      <div className="bg-white">
        {children}
      </div>
    </div>
  );
};

export default BrowserChrome;
