export default function MakeHotelReservation() {
  return (
    <section id="accommodation" className="px-4 md:px-5 h-[444px] md:h-[685px] flex items-center justify-end make-hotel-reservation-bg">
      <div className="max-w-306.5 w-full h-[303px] md:h-117.5 bg-black/29 backdrop-blur-sm mx-auto text-center flex flex-col items-center justify-center rounded-[15px] border border-white/20">
        <h2 className="text-white text-[25px] md:text-[50px] font-nunito-900 mb-1">
          Make Hotel Reservation
        </h2>
        <div className="max-w-110 w-full mx-auto text-base md:text-xl font-nunito-400 text-white mb-[19px] px-2 md:px-0">
          We have standard hotels close by for you without diffeculties
        </div>

        <button className="flex items-center justify-center h-[51px] md:h-16 px-[67px] md:px-13.5 border border-white rounded-[50px]">
          <span className="text-white font-nunito-400 font-bold text-sm md:text-[25px]">
            Book
          </span>
        </button>
      </div>
    </section>
  );
}
