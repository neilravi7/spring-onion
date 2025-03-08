// hooks
import { useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Header from '../../components/MarketPlace/Header';
import Footer from '../../components/MarketPlace/Footer';


export default function HomePage() {
  const { isAuthenticated, isVendor } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated && isVendor) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isVendor]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header Menu */}
      <Header />
      {/* Header End */}
      {/* Section container */}
      <main className="container-2xl mx-auto px-4 py-5">
        <Outlet/>
      </main>
      {/* Section container end*/}

      {/* Footer */}
      <Footer />
      {/* Footer End */}
    </div>
  )
}