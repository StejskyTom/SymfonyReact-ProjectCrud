<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/api", name="api_")
 */

class UserController extends AbstractController
{
    /**
     * @Route("/user", name="user_index", methods={"GET"})
     */
    public function index(ManagerRegistry $doctrine): Response
    {
        $users = $doctrine
            ->getRepository(User::class)
            ->findAll();

        $data = [];

        /**
         * @var User $user
         */
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'name' => $user->getName(),
                'surname' => $user->getSurname(),
                'birthDay' => $user->getBirthDate()->format('Y-m-d'),
            ];
        }


        return $this->json($data);
    }


    /**
     * @Route("/user", name="user_new", methods={"POST"})
     */
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $user = new User();
        $user->setName($request->request->get('name'));
        $user->setSurname($request->request->get('surname'));
        $user->setBirthDate(date_create_from_format('Y-m-d', $request->request->get('birthDate')));

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json('Uživatel byl přidán ' . $user->getId());
    }

    /**
     * @Route("/user/{id}", name="user_show", methods={"GET"})
     */
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $user = $doctrine->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json('Uživatel s tímto id: ' . $id . ' nebyl nalezen', 404);
        }

        $data =  [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'surname' => $user->getSurname(),
            'birthDate' => $user->getBirthDate()->format('Y-m-d'),
        ];

        return $this->json($data);
    }

    /**
     * @Route("/user/{id}", name="user_edit", methods={"PUT", "PATCH"})
     */
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        /** @var User $user */
        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json('Uživatel s tímto id: ' . $id . ' nebyl nalezen', 404);
        }

        $content = json_decode($request->getContent());
        $user->setName($content->name);
        $user->setSurname($content->surname);
        $user->setBirthDate(date_create_from_format('Y-m-d', $content->birthDate));
        $entityManager->flush();

        $data =  [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'surname' => $user->getSurname(),
            'birthDate' => 'Ahoj',
        ];

        return $this->json($data);
    }

    /**
     * @Route("/user/{id}", name="user_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json('Uživatel s tímto id: ' . $id . ' nebyl nalezen', 404);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return $this->json('Uživatel byl úspěšně odstraněn ' . $id);
    }
}