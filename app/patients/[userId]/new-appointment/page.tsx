import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

// Destructure the userId from the params.
export default async function NewAppointment({ params: { userId } }: SearchParamProps) {
  // Call the getPatient function from patient.actions.ts & pass in the userId.
  const patient = await getPatient(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      {/* leftside form */}
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <Image
            src='/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt='patient'
            className='mb-12 h-10 w-fit'
          />

          <AppointmentForm
            // Pass the props to the AppointmentForm.
            type='create'
            userId={userId}
            patientId={patient?.$id}
          />

          <p className='copyright mt-10 py-12'>© 2024 CarePluse</p>
        </div>
      </section>
      {/* rightside image */}
      <Image
        src='/assets/images/appointment-img.png'
        height={1000}
        width={1000}
        alt='appointment'
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
}