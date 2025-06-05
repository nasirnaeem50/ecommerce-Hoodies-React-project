import { Link } from 'react-router-dom';
import person1 from "../assets/images/person-01.jpg";
import person2 from "../assets/images/person-06.jpg";
import person3 from "../assets/images/person-07.jpg";
import teamImage from "../assets/images/orange.jpg"; 
import qualityImage from "../assets/images/h5.jpeg"; 

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative  text-black">
        <div className="absolute inset-0 "></div>
        <div className="container mx-auto px-4 py-32 relative z-10 flex justify-center items-center flex-col">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-2xl">
            From humble beginnings to becoming your favorite hoodie destination
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="lg:w-1/2">
            <img 
              src={teamImage} 
              alt="Hodies team" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est accusamus hic animi incidunt rerum quis, quam, natus provident impedit eum ipsa fuga ullam suscipit cum deserunt dolorum officiis ex illum.
            </p>
            <p className="text-gray-700 text-lg">
              Every stitch tells our story - one of quality, comfort, and uncompromising style.
            </p>
          </div>
        </section>

        {/* Quality Promise */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img 
                src={qualityImage} 
                alt="Premium quality materials" 
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6">Our Quality Promise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Premium Materials</h3>
                  <p className="text-gray-600">
                    We source only the softest, most durable fabrics that stand the test of time.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Ethical Manufacturing</h3>
                  <p className="text-gray-600">
                    All our partners maintain fair wages and safe working conditions.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Sustainable Practices</h3>
                  <p className="text-gray-600">
                    From eco-friendly packaging to reduced water dye techniques.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">1-Year Guarantee</h3>
                  <p className="text-gray-600">
                    If you're not satisfied, we'll make it right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: person1, name: "Asad Khan", quote: "The quality of Hodies products is unmatched. I've had my hoodie for over a year and it still looks brand new!", role: "Loyal Customer" },
              { img: person2, name: "Abdullah", quote: "Great customer service and fast shipping. Will definitely be ordering again soon!", role: "Frequent Shopper" },
              { img: person3, name: "Anna", quote: "So comfortable and stylish. I get compliments every time I wear my Hodies hoodie!", role: "Fashion Blogger" }
            ].map((person, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{person.name}</h3>
                    <p className="text-gray-500 text-sm">{person.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{person.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the Hodies Family</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience comfort redefined with our premium hoodie collection
          </p>
          <Link to="/products">
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
            Shop Now
          </button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;