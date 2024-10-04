import { useDroppable } from '@dnd-kit/core'

export const UserInfo = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: 'user-info',
  })
  return (
    <section
      id="main"
      ref={setNodeRef}
      className="max-h-screen h-screen bg-gradient-to-b from-slate-800 to-slate-950"
    >
      <BasicInfo />
      {/* Card */}
      {children}
      <Biography />
    </section>
  )
}

export const BasicInfo = () => {
  return (
    <article
      id="basic-info"
      className="grid grid-cols-[75%_20%] items-center"
    >
      <div className="[&_p]:font-semibold [&_p]:text-xl [&_p>span]:font-normal [&_p>span]:opacity-80 [&_p>span]:text-[17px]">
        <h2 className="text-4xl font-bold tracking-tighter mb-3">Lorem ipsum dolor sit.</h2>
        <p>
          Age: <span>20</span>
        </p>
        <p>
          Gender: <span>Male</span>
        </p>
        <p>
          Email: <span>example@gmail.com</span>
        </p>
        <p>
          Phone: <span>+1 234 567 890</span>
        </p>
        <p>
          Address: <span>123 Main St, Anytown USA</span>
        </p>
        <p>
          Hobbies: <span>Photography ,Hiking ,Painting</span>
        </p>
        <p>
          Languages: <span>English ,Spanish ,French</span>
        </p>
      </div>

      <img
        src="/profile.png"
        alt="#"
      />
    </article>
  )
}

export const Biography = () => {
  /* 1600 */
  return (
    <article
      id="biography"
      className="grid place-items-center text-pretty"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio consectetur autem hic dolorem. Possimus dignissimos veritatis voluptatibus dolorum debitis, consequatur commodi aliquid
        atque aliquam ullam eligendi est molestiae deserunt magnam culpa alias officiis doloremque tenetur eos placeat adipisci? Voluptatem voluptas culpa quia fuga quidem eaque facilis dolorem
        nostrum debitis error dolor, nesciunt, iure harum, modi aperiam explicabo ipsa. Commodi neque maxime quibusdam quisquam eaque assumenda error dicta deserunt vero eius. Labore delectus
        praesentium ipsum, magni ducimus saepe unde facere quis iste ut veritatis tempora, dignissimos accusamus! Tempora, quas! Qui mollitia suscipit exercitationem repellat quisquam consequatur
        facilis quo obcaecati saepe adipisci perferendis excepturi repudiandae velit quia tempora eos deserunt tenetur, vitae expedita? Vero repudiandae unde quo voluptatem sequi ea eos eligendi? At
        non blanditiis nisi officia velit corporis, ex cumque odit corrupti repellat quasi eius. Reiciendis a placeat ad unde molestias quod, eveniet asperiores, voluptatibus autem labore aliquid
        repellendus velit voluptates nisi tempore, id nemo dolore ut. Cupiditate reiciendis repudiandae nihil molestias esse labore atque repellat laborum quos at, odio suscipit, eum . At non
        blanditiis nisi officia velit corporis, ex cumque odit corrupti repellat quasi eius. Reiciendis a placeat ad unde molestias quod, eveniet asperiores, voluptatibus autem labore aliquid
        repellendus velit voluptates nisi tempore, id nemo dolore ut. Cupiditate reiciendis repudiandae nihil molestias esse labore atque repellat laborum quos at, odio suscipit, eum
      </p>
    </article>
  )
}
