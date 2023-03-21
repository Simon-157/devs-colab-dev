/* Importing the useContext hook from react. */
import React, {useContext} from 'react'
import Image from 'next/image'

/* Importing the components and the styles from the folder. */
import Button from '@/components/button/Button'
import { ArrowIcon } from '@/components/icons/Icons'
import { useUser } from '@/contexts/userContext'
import { LOGIN, PROBLEMS } from '@/utils/constants'
import Footer from '@/widgets/footer/Footer'

import homeStyles from './home.module.scss'
import CodeShot from  "@/assets/code-shot.png"


const Home = () => {
  const {currentUser, isCurrentUserLoading} = useUser();


  return (
    <>
    <div className={homeStyles.Wrapper}>
       <div>
            <h2> Lets Solve the Challenge Together </h2>
            enjoy the full assets of a <strong>collaborative environment </strong>with visual <br/>interractions
           
       </div>
       <div className={homeStyles.joinBtn} 
       >
        {!currentUser &&
          <Button 
          to={LOGIN}
          text = "Join the colab"
          icon={<ArrowIcon />}
          />
        }
        {currentUser &&
          <Button 
          to={PROBLEMS}
          text = "Join the colab"
          icon={<ArrowIcon />}
          
          />
        }
       </div>
        <div className = {homeStyles.codeShot}>
          <Image src={CodeShot} alt= "code-shot"/>
        </div>
    </div>
    <div className={homeStyles.arbitrary}>
    </div>
      <Footer />
    </>
  )
}

export default Home